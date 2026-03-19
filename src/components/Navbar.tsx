"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/register", label: "Register" },
  { href: "/booking", label: "Book a Table" },
  { href: "/admin", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4">
      <Link href="/" className="flex items-center gap-2 text-gray-800 font-medium text-lg no-underline">
        <span className="material-icons text-blue-500 text-3xl">restaurant</span>
        Reserve with Google Demo
      </Link>
      <div className="flex gap-2 ml-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-full text-sm font-medium no-underline transition-colors ${
              pathname === link.href
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
