import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

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
            <Link href="/" className="inline-block" aria-label="First Media Home">
              <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 w-fit">
                <span className="text-white font-black text-2xl tracking-tighter">FIRST</span>
                <div className="w-1 h-6 bg-brand-400 rounded-full" />
                <span className="text-accent-400 font-black text-2xl tracking-tighter">MEDIA</span>
              </div>
            </Link>
            <p className="text-brand-100/80 text-sm leading-relaxed font-medium max-w-sm">
              Penyedia layanan internet rumah Fiber Optic super cepat dan TV kabel berkualitas tinggi. Nikmati koneksi andal tanpa batas untuk seluruh keluarga Anda.
            </p>
            <div className="flex items-center gap-2 text-brand-200 text-xs font-bold bg-brand-800 w-fit px-3 py-1.5 rounded-lg border border-brand-700">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              Official Sales Partner
            </div>
          </div>

          {/* Quick Links (Col span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Navigasi</h3>
            <ul className="space-y-4">
              {['Paket Internet', 'Coverage Area', 'FAQ'].map((item, idx) => (
                <li key={idx}>
                  <Link href={`#${item.split(' ')[0].toLowerCase()}`} className="text-brand-100/70 hover:text-white hover:translate-x-1 transition-all text-sm font-medium flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent-500 rounded-full"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (Col span 3) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Hubungi Kami</h3>
            <ul className="space-y-5">
              <li>
                <a href="https://wa.me/62895329158096" target="_blank" rel="noreferrer" className="flex items-start gap-3 group">
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-accent-500 transition-colors">
                    <Phone className="w-4 h-4 text-accent-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">0812-3456-7890</p>
                    <p className="text-brand-100/60 text-xs mt-0.5">WhatsApp Available</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 group">
                  <div className="bg-white/5 p-2 rounded-lg group-hover:bg-brand-500 transition-colors">
                    <Mail className="w-4 h-4 text-brand-300 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">info@pasangfirstmedia.com</p>
                    <p className="text-brand-100/60 text-xs mt-0.5">Email Support</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <div className="bg-white/5 p-2 rounded-lg mt-0.5">
                    <MapPin className="w-4 h-4 text-brand-300" />
                  </div>
                  <p className="text-brand-100/70 text-sm font-medium leading-relaxed">
                    Jl. Jend. Sudirman Kav. 21,<br />Jakarta Selatan, 12920
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-200/50 text-xs font-medium text-center md:text-left">
            &copy; {new Date().getFullYear()} First Media Sales Agent. All rights reserved.<br className="hidden md:block" />
            <span className="text-brand-200/30">Disclaimer: Website ini dikelola oleh agen penjualan resmi, bukan official website First Media inti.</span>
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-brand-200/50 hover:text-white text-xs font-medium transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="text-brand-200/50 hover:text-white text-xs font-medium transition-colors">Syarat & Ketentuan</Link>
            <Link href="/admin/login" className="text-brand-200/50 hover:text-white text-xs font-medium transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
