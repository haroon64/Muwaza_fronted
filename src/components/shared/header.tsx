"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import AccountMenu from "@/components/shared/menueBar"
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Check token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    // router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Bookings", href: "/bookings" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header  style={{height:"80px"}} className="bg-teal-500 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logos/Muawza_logo_header.png"
              alt="Company Logo"
              width={120}
              height={120}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-m font-strong ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (

                <AccountMenu/>
            //   <div className="relative group">
            //     <button className="flex items-center space-x-2 focus:outline-none">
            //       <User className="w-6 h-6 text-gray-700" />
            //     </button>
            //     <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg hidden group-hover:block">
            //       <Link
            //         href="/settings"
            //         className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //       >
            //         settings
            //       </Link>
            //       <button
            //         onClick={handleLogout}
            //         className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //       >
            //         Logout
            //       </button>
            //     </div>
            //   </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-gray-700 hover:text-blue-600 ${
                  pathname === link.href ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 text-blue-600 font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100">
                <Link
                  href="/profile"
                  className="block py-2 text-gray-700 hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
