import Link from "next/link";

const features = [
  {
    href: "/register",
    icon: "store",
    color: "text-blue-600",
    title: "Register Restaurant",
    desc: "Add your restaurant to the platform. Set operating hours, table capacity, and cuisine type.",
  },
  {
    href: "/booking",
    icon: "event_seat",
    color: "text-green-600",
    title: "Make a Reservation",
    desc: 'Search and book tables at your favorite restaurants. Select date, time, and party size easily.',
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 rounded-full">
              <p className="text-xs sm:text-sm font-semibold text-blue-700">Welcome to Our Platform</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 text-gray-900 leading-tight px-2">
              Easy Table <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Reservations</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 lg:mb-12 leading-relaxed px-2">
              A comprehensive restaurant reservation platform that makes it simple for diners to find and book tables, and for restaurants to manage their reservations efficiently.
            </p>
          </div>

          {/* Two Main CTA Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-24">
            {/* Register Restaurant Card */}
            <Link
              href="/register"
              className="group relative h-full overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 no-underline transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className="relative mb-4 sm:mb-6 flex justify-center">
                <div className="absolute inset-0 bg-blue-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-blue-50 rounded-2xl p-4 sm:p-5 group-hover:bg-blue-100 transition-all duration-300">
                  <span className="material-icons text-4xl sm:text-5xl lg:text-6xl text-blue-600 group-hover:scale-110 transition-transform duration-300">store</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-700 transition-colors duration-300">
                  Register Restaurant
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Add your restaurant to the platform. Set operating hours, table capacity, and cuisine type.
                </p>
                
                {/* Button */}
                <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100 group-hover:border-blue-200 transition-colors">
                  <span className="text-xs sm:text-sm font-semibold text-gray-500 group-hover:text-blue-600 transition-colors">Get Started</span>
                  <div className="bg-blue-600 text-white rounded-full p-3 sm:p-4 group-hover:bg-blue-700 group-hover:translate-x-1 transition-all duration-300 flex items-center justify-center">
                    <span className="material-icons text-lg sm:text-xl">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Make a Reservation Card */}
            <Link
              href="/booking"
              className="group relative h-full overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 no-underline transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-gray-100"
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon Container */}
              <div className="relative mb-4 sm:mb-6 flex justify-center">
                <div className="absolute inset-0 bg-green-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-green-50 rounded-2xl p-4 sm:p-5 group-hover:bg-green-100 transition-all duration-300">
                  <span className="material-icons text-4xl sm:text-5xl lg:text-6xl text-green-600 group-hover:scale-110 transition-transform duration-300">event_seat</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors duration-300">
                  Make a Reservation
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Search and book tables at your favorite restaurants. Select date, time, and party size easily.
                </p>
                
                {/* Button */}
                <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100 group-hover:border-green-200 transition-colors">
                  <span className="text-xs sm:text-sm font-semibold text-gray-500 group-hover:text-green-600 transition-colors">Book Now</span>
                  <div className="bg-green-600 text-white rounded-full p-3 sm:p-4 group-hover:bg-green-700 group-hover:translate-x-1 transition-all duration-300 flex items-center justify-center">
                    <span className="material-icons text-lg sm:text-xl">arrow_forward</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* API Integration Section */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-24 border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 rounded-full">
                <p className="text-xs sm:text-sm font-semibold text-blue-700">Developers</p>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-900 px-2">
                API Integration
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                Robust API endpoints for seamless integration with your applications
              </p>
            </div>

            {/* API Table - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-200">
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Method</th>
                      <th className="text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Endpoint</th>
                      <th className="hidden sm:table-cell text-left px-3 sm:px-6 py-3 sm:py-4 text-xs font-bold text-gray-700 uppercase tracking-wider">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiEndpoints.map((ep, index) => (
                      <tr 
                        key={ep.path} 
                        className={`border-b border-gray-100 hover:bg-blue-50 transition-all duration-200 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${ep.color}`}>{ep.method}</span>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <code className="text-xs sm:text-sm font-mono text-gray-900 bg-gray-100 px-2 sm:px-3 py-1 rounded break-all sm:break-normal">{ep.path}</code>
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{ep.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Description View */}
              <div className="sm:hidden px-4 py-4 space-y-4 border-t border-gray-200 bg-gray-50">
                {apiEndpoints.map((ep) => (
                  <div key={ep.path} className="pb-4 border-b border-gray-200 last:border-b-0">
                    <p className="text-xs font-semibold text-gray-600 mb-2">Description:</p>
                    <p className="text-sm text-gray-700">{ep.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
