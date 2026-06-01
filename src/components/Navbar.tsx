"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";

const NAV_LINKS = [
  { name: "Paket Internet", href: "#packages" },
  { name: "Coverage Area", href: "#coverage" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "shadow-sm" : ""
        }`}
    >
      {/* Top bar — FM deep blue */}
      <div className="bg-brand-900 text-white text-xs py-2 px-4 text-center hidden md:block">
        <span className="opacity-80">📞 Hubungi Kami: </span>
        <a href="tel:+62150788" className="font-bold hover:text-accent-300 transition-colors">150788</a>
        <span className="mx-4 opacity-40">|</span>
        <span className="opacity-80">WhatsApp: </span>
        <a href="https://wa.me/62895329158096" target="_blank" rel="noreferrer" className="font-bold hover:text-accent-300 transition-colors">0812-3456-7890</a>
      </div>

      {/* Main navbar */}
      <nav className={`transition-colors duration-300 border-b ${isScrolled ? 'bg-white/95 backdrop-blur-md border-slate-200' : 'bg-white border-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="FirstMedia Home">
            <Image
              src="/images/logos/logo.webp"
              alt="First Media Logo"
              width={160}
              height={48}
              className="h-8 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-slate-600 hover:text-brand-600 hover:bg-slate-50 px-4 py-2.5 rounded-full transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/62895329158096"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 shadow-md hover:shadow-lg shadow-accent-500/20 text-white px-6 py-3 rounded-full font-bold text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4" />
              Pasang Sekarang
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-brand-900 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-nav"
          className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 transition-all duration-300 origin-top overflow-hidden shadow-lg ${mobileMenuOpen ? "opacity-100 max-h-96 py-4" : "opacity-0 max-h-0 py-0"
            }`}
        >
          <div className="flex flex-col px-4 gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-brand-700 hover:bg-slate-50 px-4 py-3.5 rounded-xl text-[15px] font-bold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px w-full bg-slate-100 my-2" />
            <a
              href="https://wa.me/62895329158096"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-accent-500 text-white px-4 py-4 rounded-xl font-bold text-[15px] transition-colors shadow-sm active:scale-95"
            >
              <Phone className="w-4.5 h-4.5" />
              Pasang via WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
