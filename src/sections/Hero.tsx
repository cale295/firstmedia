import { Phone, CheckCircle2, ArrowRight, ShieldCheck, Zap, Wifi } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

interface HeroProps {
  localArea?: string;
}

export default function Hero({ localArea }: HeroProps) {
  return (
    <section className="relative bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* ── MOBILE HERO BACKGROUND BANNER (Visible only on < 1024px) ── */}
      <div className="block lg:hidden absolute inset-0 z-0">
        <Image
          src={IMAGES.BANNERS.BANNER}
          alt={localArea ? `Promo First Media ${localArea}` : "Promo First Media"}
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 0vw"
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0"></div>
      </div>

      {/* Background Decorations (Optimized: Removed blur-3xl for LCP) */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-[600px] h-[600px] bg-brand-50 rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
        <div className="w-[500px] h-[500px] bg-accent-50 rounded-full opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left Text Content */}
          <header className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              Promo Spesial Bulan Ini
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[68px] font-black text-slate-900 leading-[1.1] tracking-tight">
              {localArea ? `Pasang First Media ${localArea}` : "Internet Rumah"} <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500">
                Super Cepat
              </span>{" "}
              & Stabil
            </h1>

            <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Nikmati koneksi internet Fiber Optic unlimited tanpa batas kuota di {localArea ? localArea : "area Anda"}, plus hiburan TV Kabel lebih dari 150 channel — mulai dari Rp 299.000/bulan.
            </p>

            <ul className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-slate-700 font-semibold">
              {[
                { text: "Unlimited Kuota", icon: Zap },
                { text: "Router WiFi Gratis", icon: ShieldCheck },
                { text: "Instalasi Cepat", icon: CheckCircle2 }
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <item.icon className="w-4 h-4 text-green-600 shrink-0" strokeWidth={3} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20berlangganan%20FirstMedia."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-accent-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0 text-base"
              >
                <Phone className="w-5 h-5" />
                Daftar via WhatsApp
              </a>
              <a
                href="#packages"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 hover:border-brand-300 font-bold px-8 py-4 rounded-full transition-all text-base group"
              >
                Lihat Semua Paket
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <p className="text-sm text-slate-400 font-medium pt-2">
              *Harga belum termasuk PPN 11% dan biaya sewa perangkat.
            </p>
          </header>

          {/* Right Hero Image / Marketing Banner */}
          <div className="hidden lg:block flex-1 w-full max-w-lg lg:max-w-xl mx-auto relative group">
            {/* Decorative Offset Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-accent-500 rounded-[2.5rem] transform rotate-3 scale-[1.02] -z-10 opacity-20"></div>

            {/* Main Lifestyle Image Container */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-[4/5]">
              <Image
                src={IMAGES.HERO.MAIN}
                alt={localArea ? `Keluarga menggunakan internet fiber optic First Media di ${localArea}` : "Keluarga menggunakan internet fiber optic First Media"}
                fill
                priority
                fetchPriority="high"
                className="object-cover object-center"
                sizes="(max-width: 1024px) 0vw, 50vw"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Floating Speed Highlight (Optimized: Removed backdrop blur) */}
              <div className="absolute top-6 right-6 bg-white/95 rounded-2xl p-4 shadow-xl border border-white/40">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 p-2 rounded-full">
                    <Wifi className="w-6 h-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Speed Up To</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">500 <span className="text-sm font-bold text-slate-600">Mbps</span></p>
                  </div>
                </div>
              </div>

              {/* Trust Indicator / Promotional Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-flex items-center gap-2 bg-accent-500 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-3 shadow-lg shadow-accent-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  Promo Terbatas
                </div>
                <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight mb-2">
                  Hiburan Tanpa Batas Untuk Keluarga
                </h2>
                <p className="text-white/80 text-sm sm:text-base font-medium line-clamp-2">
                  Streaming 4K, gaming lancar, dan WFH tanpa gangguan dengan koneksi fiber optic paling stabil.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
