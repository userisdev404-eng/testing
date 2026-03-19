"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  cuisine_type: string;
  party_size_min: number;
  party_size_max: number;
  open_time: string;
  close_time: string;
  slot_duration_min: number;
  tables_available: number;
}

interface SlotAvailability {
  slot: { merchant_id: string; start_sec: string; duration_sec: number; party_size: number };
  available: boolean;
  spots_open: number;
  spots_total: number;
}

interface BookingResult {
  booking: {
    booking_id: string;
    slot: { merchant_id: string; start_sec: string; duration_sec: number; party_size: number };
    user_information: { given_name: string; family_name: string; email: string; telephone: string };
    status: string;
  };
}

export default function BookingPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selected, setSelected] = useState<Restaurant | null>(null);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [partySize, setPartySize] = useState(2);
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotAvailability | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [booking, setBooking] = useState<BookingResult | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Guest form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("/api/restaurants").then((r) => r.json()).then(setRestaurants);
  }, []);

  const loadSlots = useCallback(async () => {
    if (!selected) return;
    setSlotsLoading(true);
    setSelectedSlot(null);
    try {
      const res = await fetch("/api/v3/BatchAvailabilityLookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: selected.id,
          slot_time_range: { start_time: `${date}T00:00:00Z`, end_time: `${date}T23:59:59Z` },
          party_size: partySize,
        }),
      });
      const data = await res.json();
      setSlots(data.slot_time_availability || []);
    } catch {
      setSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [selected, date, partySize]);

  useEffect(() => {
    if (step === 2) loadSlots();
  }, [step, loadSlots]);

  async function confirmBooking() {
    if (!selected || !selectedSlot) return;
    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all fields");
      return;
    }
    setBookingLoading(true);
    try {
      const res = await fetch("/api/v3/CreateBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: {
            merchant_id: selected.id,
            start_sec: selectedSlot.slot.start_sec,
            duration_sec: selectedSlot.slot.duration_sec,
            party_size: partySize,
          },
          user_information: { given_name: firstName, family_name: lastName, email, telephone: phone },
          idempotency_token: crypto.randomUUID(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBooking(data);
        setStep(4);
      } else {
        alert("Booking failed: " + (data.error || data.message));
      }
    } catch (err) {
      alert("Network error: " + (err as Error).message);
    } finally {
      setBookingLoading(false);
    }
  }

  function reset() {
    setSelected(null);
    setSelectedSlot(null);
    setBooking(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setStep(1);
  }

  const steps = ["Restaurant", "Date & Time", "Details", "Confirmed"];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-6 items-start">
        {/* Map Card */}
        <div className="bg-white rounded-xl shadow overflow-hidden sticky top-20">
          <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="material-icons text-5xl text-red-500">place</span>
          </div>
          <div className="p-5">
            <h3 className="text-lg font-medium">{selected?.name || "Select a Restaurant"}</h3>
            <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1 mb-2">
              {[1, 2, 3, 4].map((i) => (<span key={i} className="material-icons text-base">star</span>))}
              <span className="material-icons text-base">star_half</span>
              <span className="text-gray-500 ml-1">4.5 (128)</span>
            </div>
            <div className="flex items-start gap-1 text-sm text-gray-500 mb-2">
              <span className="material-icons text-base mt-0.5">location_on</span>
              {selected?.address || "—"}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
              <span className="material-icons text-base">schedule</span>
              {selected ? `${selected.open_time} — ${selected.close_time}` : "—"}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="material-icons text-base">restaurant_menu</span>
              {selected?.cuisine_type || "—"}
            </div>
          </div>
          <div className="text-center py-3 border-t text-xs text-gray-400">
            Powered by <span className="text-blue-500 font-medium">Reserve with Google</span>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500 text-white px-6 py-5 flex items-center gap-3">
            <span className="material-icons text-3xl">event_seat</span>
            <h2 className="text-xl font-medium">Reserve a table</h2>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center py-5 border-b">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && <div className={`w-10 h-0.5 mx-2 ${i < step ? "bg-green-500" : "bg-gray-200"}`} />}
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border-2 ${
                    i + 1 === step ? "border-blue-500 bg-blue-500 text-white"
                      : i + 1 < step ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 text-gray-400"
                  }`}>
                    {i + 1 < step ? <span className="material-icons text-sm">check</span> : i + 1}
                  </div>
                  <span className={`text-xs ${i + 1 === step ? "text-blue-500 font-medium" : i + 1 < step ? "text-green-500" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6">
            {/* Step 1: Select Restaurant */}
            {step === 1 && (
              <div>
                <h3 className="font-medium mb-4">Choose a restaurant</h3>
                {restaurants.length === 0 ? (
                  <div className="text-center py-10 text-gray-400">
                    <span className="material-icons text-6xl text-gray-200">store</span>
                    <p className="mt-2">No restaurants registered yet.</p>
                    <Link href="/register" className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-blue-500 text-white rounded-full text-sm no-underline">Register One</Link>
                  </div>
                ) : (
                  <>
                    <select
                      value={selected?.id || ""}
                      onChange={(e) => setSelected(restaurants.find((r) => r.id === e.target.value) || null)}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none mb-4"
                    >
                      <option value="">Select a restaurant...</option>
                      {restaurants.map((r) => (
                        <option key={r.id} value={r.id}>{r.name} — {r.cuisine_type}</option>
                      ))}
                    </select>
                    <button disabled={!selected} onClick={() => setStep(2)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                      Continue <span className="material-icons text-lg">arrow_forward</span>
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <h3 className="font-medium mb-4">Select date, time & party size</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1.5">Date</label>
                    <input type="date" value={date} min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => { setDate(e.target.value); }}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1.5">Party Size</label>
                    <input type="number" value={partySize} min={selected?.party_size_min || 1} max={selected?.party_size_max || 10}
                      onChange={(e) => { setPartySize(parseInt(e.target.value)); }}
                      className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
                  </div>
                </div>

                {slotsLoading && (
                  <div className="flex justify-center py-10">
                    <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                  </div>
                )}

                {!slotsLoading && slots.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Available Times</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {slots.map((s, i) => {
                        const time = new Date(s.slot.start_sec);
                        const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                        return (
                          <div key={i}
                            className={`slot-pill ${s.available ? "" : "unavailable"} ${selectedSlot === s ? "selected" : ""}`}
                            onClick={() => s.available && setSelectedSlot(s)}
                            title={s.available ? `${s.spots_open}/${s.spots_total} tables` : "Fully booked"}>
                            {timeStr}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {!slotsLoading && slots.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <span className="material-icons text-4xl text-gray-200">event_busy</span>
                    <p className="mt-2">No available slots for this date.</p>
                  </div>
                )}

                <div className="flex gap-3 mt-5">
                  <button onClick={() => setStep(1)} className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
                    <span className="material-icons text-lg">arrow_back</span> Back
                  </button>
                  <button disabled={!selectedSlot} onClick={() => setStep(3)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                    Continue <span className="material-icons text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Guest Details */}
            {step === 3 && (
              <div>
                <h3 className="font-medium mb-4">Your details</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1.5">First Name *</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"
                      className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1.5">Last Name *</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"
                      className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1.5">Email *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
                    className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-1.5">Phone *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+94 77 123 4567"
                    className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none" />
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <input type="checkbox" defaultChecked id="policy" />
                  <label htmlFor="policy">I agree to the restaurant&apos;s cancellation policy</label>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50">
                    <span className="material-icons text-lg">arrow_back</span> Back
                  </button>
                  <button onClick={confirmBooking} disabled={bookingLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 transition-colors">
                    {bookingLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="material-icons text-lg">check</span>
                    )}
                    {bookingLoading ? "Booking..." : "Confirm Reservation"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && booking && (
              <div className="text-center py-5">
                <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <span className="material-icons text-5xl text-green-500">check</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Reservation Confirmed!</h3>
                <p className="text-gray-500 mb-5">Your table has been reserved. A confirmation has been sent.</p>

                <div className="bg-gray-50 rounded-lg p-4 text-left mb-5">
                  {[
                    ["Booking ID", booking.booking.booking_id.substring(0, 8) + "..."],
                    ["Restaurant", selected?.name],
                    ["Date", new Date(booking.booking.slot.start_sec).toLocaleDateString([], { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
                    ["Time", new Date(booking.booking.slot.start_sec).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })],
                    ["Party Size", booking.booking.slot.party_size + " guests"],
                    ["Guest", `${firstName} ${lastName}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-gray-200 last:border-0 text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="px-3 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">CONFIRMED</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600">
                    <span className="material-icons text-lg">add</span> Book Another
                  </button>
                  <Link href="/admin" className="flex items-center gap-2 px-5 py-2.5 bg-white text-blue-500 border border-gray-300 rounded-full text-sm font-medium hover:bg-blue-50 no-underline">
                    <span className="material-icons text-lg">dashboard</span> View Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
