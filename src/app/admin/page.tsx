"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Restaurant {
  id: string;
  name: string;
  cuisine_type: string;
}

interface Booking {
  booking_id: string;
  merchant_id: string;
  slot_start: string;
  slot_end: string;
  party_size: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("/api/restaurants").then((r) => r.json()).then(setRestaurants);
  }, []);

  const loadBookings = useCallback(async () => {
    if (!selectedId) return;
    const res = await fetch(`/api/restaurants/${selectedId}/bookings`);
    setBookings(await res.json());
  }, [selectedId]);

  useEffect(() => {
    if (selectedId) {
      loadBookings();
      const interval = setInterval(loadBookings, 30000);
      return () => clearInterval(interval);
    } else {
      setBookings([]);
    }
  }, [selectedId, loadBookings]);

  async function cancelBooking(bookingId: string) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    const res = await fetch(`/api/bookings/${bookingId}/cancel`, { method: "PATCH" });
    if (res.ok) loadBookings();
    else alert("Failed to cancel");
  }

  const todayStr = new Date().toISOString().split("T")[0];
  const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
  const cancelled = bookings.filter((b) => b.status === "CANCELLED");
  const todayBookings = bookings.filter((b) => b.slot_start.startsWith(todayStr));

  const stats = [
    { label: "Total Bookings", value: bookings.length, color: "text-blue-500" },
    { label: "Confirmed", value: confirmed.length, color: "text-green-500" },
    { label: "Today", value: todayBookings.length, color: "text-yellow-500" },
    { label: "Cancelled", value: cancelled.length, color: "text-red-500" },
  ];

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      <h2 className="text-2xl font-light mb-5">Admin Dashboard</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block text-sm font-medium text-gray-500 mb-2">Select Restaurant</label>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}
          className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none">
          <option value="">Select a restaurant...</option>
          {restaurants.map((r) => (
            <option key={r.id} value={r.id}>{r.name} — {r.cuisine_type}</option>
          ))}
        </select>
      </div>

      {!selectedId && (
        <div className="text-center py-16 text-gray-400">
          <span className="material-icons text-6xl text-gray-200">assessment</span>
          <p className="mt-4">Select a restaurant to view its bookings</p>
        </div>
      )}

      {selectedId && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-lg shadow p-5 text-center">
                <div className={`text-4xl font-light ${s.color}`}>{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-medium p-6 pb-0">Reservations</h3>
            {bookings.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <span className="material-icons text-6xl text-gray-200">inbox</span>
                <p className="mt-4">No bookings yet for this restaurant.</p>
                <Link href="/booking" className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-blue-500 text-white rounded-full text-sm no-underline">
                  Make a Booking
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto p-6 pt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      {["Booking ID", "Date", "Time", "Party", "Guest Name", "Email", "Phone", "Status", "Action"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => {
                      const d = new Date(b.slot_start);
                      return (
                        <tr key={b.booking_id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-xs">{b.booking_id.substring(0, 8)}...</td>
                          <td className="px-4 py-3 text-sm">{d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}</td>
                          <td className="px-4 py-3 text-sm">{d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                          <td className="px-4 py-3 text-sm">{b.party_size}</td>
                          <td className="px-4 py-3 text-sm">{b.user_name}</td>
                          <td className="px-4 py-3 text-sm">{b.user_email}</td>
                          <td className="px-4 py-3 text-sm">{b.user_phone}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              b.status === "CONFIRMED" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                            }`}>{b.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            {b.status === "CONFIRMED" ? (
                              <button onClick={() => cancelBooking(b.booking_id)}
                                className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-medium hover:bg-red-600">
                                Cancel
                              </button>
                            ) : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
