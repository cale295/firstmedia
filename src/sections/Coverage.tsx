import { MapPin, Search, Activity, Network, ShieldCheck, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import CoverageMapClient from "@/components/Map/CoverageMapClient";

export default async function Coverage() {
  const supabase = await createClient();
  const { data: areas } = await supabase
    .from("areas")
    .select("*")
    .eq("active", true)
    .order("city", { ascending: true });

  const activeAreas = areas || [];

  const statistics = [
    {
      icon: Activity,
      title: "99.9% Uptime Jaringan",
      desc: "Koneksi andal dan stabil sepanjang hari untuk kelancaran WFH dan belajar online.",
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      icon: Network,
      title: "100% Fiber Optic",
      desc: "Transmisi data ultra cepat dengan latensi rendah untuk gaming dan streaming 4K.",
      color: "text-brand-500 bg-brand-50",
    },
    {
      icon: ShieldCheck,
      title: "Dukungan Teknis Resmi",
      desc: "Tim sales dan teknisi resmi bersertifikat siap melakukan instalasi dan pemeliharaan.",
      color: "text-indigo-500 bg-indigo-50",
    },
    {
      icon: Zap,
      title: "Instalasi Cepat 1-3 Hari",
      desc: "Proses registrasi instan dan penjadwalan teknisi dalam waktu 24 jam setelah verifikasi.",
      color: "text-accent-500 bg-accent-50",
    },
  ];

  return (
    <section id="coverage" className="py-20 sm:py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white -skew-x-12 translate-x-32 -z-10 opacity-70"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          {/* Header Section */}
          <header className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-brand-600 font-bold tracking-widest uppercase text-sm">Target Area</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Jangkauan Jaringan First Media
            </h2>
            <p className="text-slate-800 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              Cek ketersediaan layanan First Media di kota atau area perumahan Anda melalui peta interaktif kami. Kami terus memperluas jaringan untuk layanan yang lebih maksimal.
            </p>
          </header>

          {/* Grid Layout (Desktop: 2 Columns, Mobile: Stack Vertically) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Map and Available Cities list */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Interactive Map Component */}
              <div
                className="w-full relative z-10 h-[350px] sm:h-[400px] lg:h-[500px]"
                role="region"
                aria-label="Peta interaktif coverage area First Media"
              >
                {/* Decorative offset background */}
                <div className="absolute inset-0 rounded-3xl sm:transform sm:-rotate-2 sm:scale-[1.01] -z-10 overflow-hidden shadow-2xl">
                  <Image
                    src={IMAGES.COVERAGE.FIBER_NETWORK}
                    alt="Fiber Optic Network"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply"></div>
                </div>

                {/* The Map */}
                <CoverageMapClient areas={activeAreas} />
              </div>

              {/* Available Cities List Card */}
              <article className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/30">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-brand-600 p-3 rounded-2xl shadow-lg shadow-brand-600/20 shrink-0">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg sm:text-xl">Area Layanan Aktif</h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold uppercase tracking-wider mt-0.5">
                      Kota yang didukung jaringan fiber optic kami
                    </p>
                  </div>
                </div>

                {/* Cities Grid with Links */}
                <nav className="flex flex-wrap gap-2.5 mb-8 max-h-[170px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeAreas.length > 0 ? (
                    activeAreas.map((area) => (
                      area.slug ? (
                        <a
                          href={`/first-media-${area.slug}`}
                          key={area.id}
                          className="px-3 py-2 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
                          aria-label={`Pasang First Media di ${area.city}`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                          {area.city}
                        </a>
                      ) : (
                        <div
                          key={area.id}
                          className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-brand-500" />
                          {area.city}
                        </div>
                      )
                    ))
                  ) : (
                    <div className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-500" />
                      Jakarta (Contoh)
                    </div>
                  )}
                </nav>

                <div className="p-5 sm:p-6 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-brand-900 text-sm">Kota Anda tidak ada di daftar?</p>
                    <p className="text-xs text-brand-800 font-bold">
                      Silakan hubungi admin kami untuk cek manual via titik koordinat rumah Anda.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/62895329158096?text=Halo%2C%20saya%20ingin%20cek%20coverage%20area%20FirstMedia%20untuk%20alamat%20saya."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold py-3.5 px-6 text-xs sm:text-sm transition-colors shadow-md text-center shrink-0"
                  >
                    Hubungi Admin via WA
                  </a>
                </div>
              </article>
            </div>

            {/* Right: Coverage Statistics (Replacing the form) */}
            <article className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/30 flex flex-col justify-between relative overflow-hidden h-full">
              {/* Decorative circle glow */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight mb-2">
                  Kualitas Layanan Kami
                </h3>
                <p className="text-slate-700 text-sm font-bold uppercase tracking-wider mb-8">
                  Mengapa memilih First Media?
                </p>

                {/* Stats List */}
                <div className="space-y-6">
                  {statistics.map((stat, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className={`p-3 rounded-2xl ${stat.color} shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-base">{stat.title}</h4>
                        <p className="text-slate-700 text-sm font-medium leading-relaxed">{stat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom quick CTA */}
              <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col items-center">
                <a
                  href="https://wa.me/62895329158096?text=Halo%2C%20saya%20ingin%20tanya%20detail%20mengenai%20kualitas%20layanan%20First%20Media%20di%20kota%20saya."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black py-4 px-6 text-sm transition-all shadow-lg shadow-brand-600/10 hover:shadow-brand-600/20 active:scale-[0.98]"
                >
                  Konsultasi Jaringan Gratis
                </a>
                <p className="text-[10px] text-slate-650 font-bold uppercase tracking-widest mt-3">
                  Tanpa Komitmen — Layanan 24/7
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
