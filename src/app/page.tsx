import Link from "next/link";

const features = [
  {
    href: "/register",
    icon: "store",
    color: "text-blue-500",
    title: "Register Restaurant",
    desc: "Add a new restaurant to the platform. Set operating hours, table capacity, and cuisine type.",
  },
  {
    href: "/booking",
    icon: "event_seat",
    color: "text-green-500",
    title: "Book a Table",
    desc: 'Simulates the Google Maps "Reserve a table" button experience. Pick a date, time, and book.',
  },
  {
    href: "/admin",
    icon: "dashboard",
    color: "text-red-500",
    title: "Admin Dashboard",
    desc: "View and manage all reservations. See booking stats and cancel bookings.",
  },
];

const apiEndpoints = [
  { method: "GET", color: "bg-blue-50 text-blue-700", path: "/api/v3/HealthCheck", desc: "Check if the booking server is online" },
  { method: "POST", color: "bg-green-50 text-green-700", path: "/api/v3/BatchAvailabilityLookup", desc: "Query available time slots" },
  { method: "POST", color: "bg-green-50 text-green-700", path: "/api/v3/CreateBooking", desc: "Create a new reservation" },
  { method: "POST", color: "bg-green-50 text-green-700", path: "/api/v3/UpdateBooking", desc: "Update or cancel a reservation" },
];

export default function Home() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 py-8">
      <div className="text-center py-16">
        <h1 className="text-4xl font-light mb-3">
          Reserve with <span className="text-blue-500">Google</span> — Mock Demo
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          A complete simulation of the Reserve with Google restaurant reservation system.
          Register restaurants, accept bookings, and manage reservations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="bg-white rounded-xl shadow p-8 text-center no-underline text-gray-800 border-2 border-transparent hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className={`material-icons text-5xl mb-4 ${f.color}`}>{f.icon}</span>
            <h3 className="text-lg font-medium mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-center font-light text-2xl mb-6">Google-Style API Endpoints</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((ep) => (
                <tr key={ep.path} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${ep.color}`}>{ep.method}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{ep.path}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{ep.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
