"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-16 lg:mt-24">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-1">
              <h3 className="text-gray-900 font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <span className="material-icons text-blue-600 text-2xl">restaurant</span>
                <span className="text-sm sm:text-base">Restaurant Reservations</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                The modern way to book tables and manage restaurant reservations online.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/register" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Register Restaurant
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Book a Table
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-1">
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="mailto:userisdev404@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="col-span-1">
              <h4 className="text-gray-900 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Connect</h4>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Get in touch with our support team</p>
              <div className="space-y-2 text-xs sm:text-sm">
                <p>
                  📧{" "}
                  <a href="mailto:userisdev404@gmail.com" className="text-blue-600 hover:text-blue-700 break-all">
                    userisdev404@gmail.com
                  </a>
                </p>
                <p>
                  📞{" "}
                  <a href="tel:+94724872737" className="text-blue-600 hover:text-blue-700">
                    +94 72 487 2737
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                © {currentYear} Restaurant Reservation Platform. All rights reserved.
              </p>
              <div className="text-xs sm:text-sm text-gray-500 text-center">
                Privacy respected · GDPR compliant · Data secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
