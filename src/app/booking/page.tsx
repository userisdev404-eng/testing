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
  const [searchTerm, setSearchTerm] = useState("");
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

  // Filter restaurants based on search
  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.cuisine_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white overflow-x-hidden">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 sm:py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Reserve a Table</h1>
            <p className="text-blue-100">Find and book your favorite restaurant</p>
          </div>
        </div>
      </div>

      {/* Main Booking Widget */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="material-icons text-4xl flex-shrink-0">event_seat</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl sm:text-3xl font-bold">Make Your Reservation</h2>
                <p className="text-blue-100 text-sm">Easy online booking in 3 steps</p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200 bg-gray-50 overflow-x-auto">
              <div className="flex items-center justify-between gap-2 min-w-max sm:min-w-0">
                {steps.map((label, i) => (
                  <div key={label} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-all flex-shrink-0 ${
                      i + 1 === step ? "bg-blue-600 text-white shadow-lg scale-110" 
                        : i + 1 < step ? "bg-green-500 text-white"
                          : "bg-gray-300 text-white"
                    }`}>
                      {i + 1 < step ? <span className="material-icons text-lg">check</span> : i + 1}
                    </div>
                    <span className={`text-xs sm:text-sm font-medium text-center line-clamp-2 ${
                      i + 1 === step ? "text-blue-600" 
                        : i + 1 < step ? "text-green-600"
                          : "text-gray-400"
                    }`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 sm:px-8 py-8 overflow-x-hidden">
              {/* Step 1: Select Restaurant */}
              {step === 1 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Choose Your Restaurant</h3>
                  {restaurants.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                        <span className="material-icons text-6xl text-gray-400">store</span>
                      </div>
                      <p className="text-lg text-gray-600 mb-4">No restaurants registered yet.</p>
                      <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold no-underline hover:bg-blue-700 transition-colors">
                        <span className="material-icons">add</span> Register Restaurant
                      </Link>
                    </div>
                  ) : (
                    <>
                      {/* Search Bar */}
                      <div className="mb-6">
                        <div className="relative">
                          <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">search</span>
                          <input 
                            type="text" 
                            placeholder="Search by restaurant name, cuisine, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                          />
                        </div>
                        {searchTerm && (
                          <p className="text-sm text-gray-500 mt-2">
                            Found {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      {/* Restaurant List */}
                      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                        {filteredRestaurants.length === 0 ? (
                          <div className="text-center py-8">
                            <span className="material-icons text-5xl text-gray-300">search_off</span>
                            <p className="text-gray-600 mt-3">No restaurants match your search</p>
                          </div>
                        ) : (
                          filteredRestaurants.map((r) => (
                            <button
                              key={r.id}
                              onClick={() => setSelected(r)}
                              className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                                selected?.id === r.id 
                                  ? "border-blue-600 bg-blue-50"
                                  : "border-gray-200 hover:border-blue-300"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1">{r.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                                    <span className="material-icons text-base flex-shrink-0">restaurant_menu</span>
                                    <span className="line-clamp-1">{r.cuisine_type}</span>
                                  </p>
                                </div>
                                <div className="flex items-center gap-0.5 text-yellow-400 flex-shrink-0">
                                  {[1, 2, 3, 4].map((i) => (
                                    <span key={i} className="material-icons text-lg">star</span>
                                  ))}
                                  <span className="text-gray-400 text-xs ml-1">4.5</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                                <span className="material-icons text-base flex-shrink-0">location_on</span>
                                <span className="line-clamp-1">{r.address}</span>
                              </p>
                            </button>
                          ))
                        )}
                      </div>

                      <button 
                        disabled={!selected} 
                        onClick={() => setStep(2)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Continue <span className="material-icons">arrow_forward</span>
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Select Date & Time</h3>
                  <div className="space-y-5 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                      <input 
                        type="date" 
                        value={date} 
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => { setDate(e.target.value); }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Party Size</label>
                      <select 
                        value={partySize} 
                        onChange={(e) => { setPartySize(parseInt(e.target.value)); }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                      >
                        {Array.from({length: (selected?.party_size_max || 10) - (selected?.party_size_min || 1) + 1}, (_, i) => i + (selected?.party_size_min || 1)).map(size => (
                          <option key={size} value={size}>{size} {size === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {slotsLoading && (
                    <div className="flex justify-center py-12">
                      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                  )}

                  {!slotsLoading && slots.length > 0 && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4">Available Times</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
                        {slots.map((s, i) => {
                          const time = new Date(parseInt(s.slot.start_sec) * 1000);
                          const timeStr = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                          return (
                            <button
                              key={i}
                              onClick={() => s.available && setSelectedSlot(s)}
                              disabled={!s.available}
                              className={`p-3 rounded-lg border-2 text-sm font-semibold transition-all ${
                                selectedSlot === s 
                                  ? "bg-blue-600 text-white border-blue-600 scale-105"
                                  : s.available 
                                    ? "bg-white text-gray-900 border-gray-300 hover:border-blue-600"
                                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                              }`}
                              title={s.available ? `${s.spots_open}/${s.spots_total} tables` : "Fully booked"}
                            >
                              {timeStr}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!slotsLoading && slots.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-block p-4 bg-yellow-100 rounded-full mb-3">
                        <span className="material-icons text-5xl text-yellow-600">event_busy</span>
                      </div>
                      <p className="text-lg text-gray-600">No available slots for this date.</p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-8">
                    <button 
                      onClick={() => setStep(1)} 
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl text-base font-semibold hover:bg-gray-300 transition-colors"
                    >
                      <span className="material-icons">arrow_back</span> Back
                    </button>
                    <button 
                      disabled={!selectedSlot} 
                      onClick={() => setStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-base font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                    >
                      Continue <span className="material-icons">arrow_forward</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Guest Details */}
              {step === 3 && (
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Details</h3>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                        <input 
                          type="text" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          placeholder="John"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          placeholder="Doe"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="+94 77 123 4567"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base focus:border-blue-600 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-6 p-4 bg-blue-50 rounded-xl">
                    <input type="checkbox" defaultChecked id="policy" className="mt-1" />
                    <label htmlFor="policy" className="text-sm text-gray-700">I agree to the restaurant&apos;s cancellation policy</label>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStep(2)} 
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl text-base font-semibold hover:bg-gray-300 transition-colors"
                    >
                      <span className="material-icons">arrow_back</span> Back
                    </button>
                    <button 
                      onClick={confirmBooking} 
                      disabled={bookingLoading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-base font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                    >
                      {bookingLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        <>
                          <span className="material-icons">check</span>
                          Confirm
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && booking && (
                <div className="text-center py-8">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <span className="material-icons text-6xl text-green-600">check_circle</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h3>
                  <p className="text-gray-600 mb-8 text-lg">Your table has been reserved successfully.</p>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 border-2 border-green-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        ["Booking ID", booking.booking.booking_id.substring(0, 12)],
                        ["Restaurant", selected?.name],
                        ["Date", new Date(parseInt(booking.booking.slot.start_sec) * 1000).toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })],
                        ["Time", new Date(parseInt(booking.booking.slot.start_sec) * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })],
                        ["Guests", booking.booking.slot.party_size + " " + (booking.booking.slot.party_size === 1 ? "Guest" : "Guests")],
                        ["Name", `${firstName} ${lastName}`],
                      ].map(([label, value]) => (
                        <div key={label} className="text-left">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                          <p className="text-lg font-bold text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-6 pt-6 border-t-2 border-green-200">
                      <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">✓ CONFIRMED</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={reset} 
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      <span className="material-icons">add</span> Book Another
                    </button>
                    <Link 
                      href="/" 
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors no-underline"
                    >
                      <span className="material-icons">home</span> Go Home
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
