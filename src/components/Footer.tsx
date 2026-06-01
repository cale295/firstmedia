import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-900 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-500 via-brand-400 to-accent-500"></div>
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3">
        <div className="w-[800px] h-[800px] bg-brand-800 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-12 lg:gap-8 mb-16">

          {/* Brand Info (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center shrink-0" aria-label="Kembali ke halaman utama FirstMedia ISP">
              <Image
                src="/images/logos/logo.webp"
                alt="First Media Logo"
                width={160}
                height={48}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
            <p className="text-brand-100/80 text-sm leading-relaxed font-medium max-w-sm">
              Penyedia layanan internet rumah Fiber Optic super cepat dan TV kabel berkualitas tinggi. Nikmati koneksi andal tanpa batas untuk seluruh keluarga Anda.
            </p>
            <div className="flex items-center gap-2 text-brand-200 text-xs font-bold bg-brand-800 w-fit px-3 py-1.5 rounded-lg border border-brand-700">
              <ShieldCheck className="w-4 h-4 text-green-400" aria-hidden="true" />
              Official Sales Partner
            </div>
          </div>

          {/* Quick Links (Col span 2) */}
          <nav className="lg:col-span-2" aria-label="Navigasi footer">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Navigasi</h3>
            <ul className="space-y-4">
              {[
                { label: "Paket Internet", href: "#packages" },
                { label: "Coverage Area", href: "#coverage" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-brand-100/70 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2"
                  >
                    <div className="w-1 h-1 bg-accent-500 rounded-full" aria-hidden="true"></div>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact (Col span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Hubungi Kami</h3>
            <ul className="space-y-5">
              <li>
                <a
                  href="https://wa.me/62895329158096"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 group"
                  aria-label="Hubungi kami via WhatsApp"
                >
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent-500 transition-colors">
                    <Phone className="w-4 h-4 text-accent-400 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">+62 895-3291-58096</p>
                    <p className="text-brand-100/60 text-xs mt-0.5">WhatsApp Available</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="bg-white/5 p-2 rounded-lg">
                    <Mail className="w-4 h-4 text-brand-300" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">alifrosyid20@gmail.com</p>
                    <p className="text-brand-100/60 text-xs mt-0.5">Email Support</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Pre-copyright CTA Row */}
        <div className="border-t border-brand-800/60 pt-10 pb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg text-center md:text-left">
              Siap memasang First Media?
            </p>
            <p className="text-brand-300 text-sm font-medium mt-1 text-center md:text-left">
              Hubungi sales resmi kami sekarang dan dapatkan penawaran terbaik.
            </p>
          </div>
          <a
            href="https://wa.me/62895329158096?text=Halo%2C%20saya%20ingin%20pasang%20internet%20First%20Media.%20Boleh%20minta%20info%20paket%20dan%20harga%3F"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-accent-500/20 active:scale-95 text-sm"
            aria-label="Pasang First Media via WhatsApp"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            Pasang Sekarang via WhatsApp
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-200/50 text-xs font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} First Media Sales Agent. All rights reserved.<br className="hidden md:block" />
            <span className="text-brand-200/30">Disclaimer: Website ini dikelola oleh agen penjualan resmi, bukan official website First Media inti.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-brand-200/50 hover:text-white text-xs font-medium transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-brand-200/50 hover:text-white text-xs font-medium transition-colors">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

