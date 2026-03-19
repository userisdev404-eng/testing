"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [success, setSuccess] = useState(false);
  const [merchantId, setMerchantId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string | number> = {};

    formData.forEach((value, key) => {
      if (["party_size_min", "party_size_max", "slot_duration_min", "tables_available"].includes(key)) {
        data[key] = parseInt(value as string, 10);
      } else {
        data[key] = value as string;
      }
    });

    try {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        setMerchantId(result.id);
        setSuccess(true);
      } else {
        alert("Error: " + (result.error || "Registration failed"));
      }
    } catch (err) {
      alert("Network error: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-[700px] mx-auto px-6 py-8">
        <div className="bg-green-50 border border-green-500 rounded-lg p-5 flex items-center gap-3">
          <span className="material-icons text-green-500 text-3xl">check_circle</span>
          <div>
            <strong>Restaurant registered successfully!</strong>
            <p className="text-sm text-gray-500 mt-1">
              Merchant ID: <code className="bg-gray-100 px-2 py-0.5 rounded">{merchantId}</code>
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Link href="/booking" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 no-underline">
            <span className="material-icons text-lg">event_seat</span> Book a Table
          </Link>
          <Link href="/admin" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-500 border border-gray-300 rounded-full text-sm font-medium hover:bg-blue-50 no-underline">
            <span className="material-icons text-lg">dashboard</span> View Dashboard
          </Link>
          <button onClick={() => setSuccess(false)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-500 border border-gray-300 rounded-full text-sm font-medium hover:bg-blue-50">
            <span className="material-icons text-lg">add</span> Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto px-6 py-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-medium mb-1">Register Your Restaurant</h2>
        <p className="text-sm text-gray-500 mb-6">Add your restaurant to the Reserve with Google platform</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-500 mb-1.5">Restaurant Name *</label>
            <input type="text" name="name" required placeholder="e.g., The Spicy Spoon" className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-500 mb-1.5">Address *</label>
            <textarea name="address" required placeholder="e.g., 123 Galle Road, Colombo 03" rows={2} className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Phone Number *</label>
              <input type="tel" name="phone" required placeholder="+94 11 234 5678" className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Cuisine Type *</label>
              <select name="cuisine_type" required className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none">
                <option value="">Select cuisine...</option>
                {["Sri Lankan", "Indian", "Chinese", "Japanese", "Italian", "Thai", "American", "Mexican", "Mediterranean", "Other"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Min Party Size</label>
              <input type="number" name="party_size_min" defaultValue={1} min={1} max={50} className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Max Party Size</label>
              <input type="number" name="party_size_max" defaultValue={10} min={1} max={50} className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Opening Time</label>
              <input type="time" name="open_time" defaultValue="09:00" className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Closing Time</label>
              <input type="time" name="close_time" defaultValue="22:00" className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Slot Duration</label>
              <select name="slot_duration_min" defaultValue="60" className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none">
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
                <option value="120">120 min</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">Number of Tables</label>
              <input type="number" name="tables_available" defaultValue={20} min={1} max={500} className="w-full px-3.5 py-3 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mt-2">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="material-icons text-lg">add_business</span>
            )}
            {loading ? "Registering..." : "Register Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
}
