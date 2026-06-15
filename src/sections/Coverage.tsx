import { MapPin, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import CoverageMapClient from "@/components/Map/CoverageMapClient";
import CoverageFormClient from "@/components/Coverage/CoverageFormClient";

export default async function Coverage() {
  const supabase = await createClient();
  const { data: areas } = await supabase
    .from("areas")
    .select("*")
    .eq("active", true)
    .order("city", { ascending: true });

  const activeAreas = areas || [];

  return (
    <section id="coverage" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
          {/* Header Section (Full width, centered for balanced layout) */}
          <header className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-brand-600 font-bold tracking-widest uppercase text-sm">Target Area</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
              Apakah Area Anda Sudah Terjangkau?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              Cek ketersediaan layanan First Media di kota atau area perumahan Anda melalui peta interaktif kami. Kami terus memperluas jaringan untuk layanan yang lebih maksimal.
            </p>
          </header>

          {/* Grid Layout (Desktop: 2 Column Layout, Mobile: Stack Vertically) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Map and Available Cities list */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Interactive Map Component */}
              <div
                className="w-full relative z-10 h-[350px] sm:h-[400px] lg:h-[500px]"
                role="region"
                aria-label="Peta interaktif coverage area First Media"
              >
                {/* The decorative offset background using fiber network image */}
                <div className="absolute inset-0 rounded-3xl sm:transform sm:-rotate-3 sm:scale-[1.02] -z-10 overflow-hidden shadow-2xl">
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
              <article className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-accent-500 p-3 rounded-2xl shadow-lg shadow-accent-500/30 shrink-0">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-lg sm:text-xl">Area Tersedia Saat Ini</h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-medium">
                      Beberapa kota yang sudah didukung penuh oleh jaringan fiber optic kami:
                    </p>
                  </div>
                </div>

                {/* SEO Friendly Text Content with Internal Links */}
                <nav className="flex flex-wrap gap-2.5 mb-8 max-h-[170px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeAreas.length > 0 ? (
                    activeAreas.map((area) => (
                      area.slug ? (
                        <a
                          href={`/first-media-${area.slug}`}
                          key={area.id}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors"
                          aria-label={`Pasang First Media di ${area.city}`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                          {area.city}
                        </a>
                      ) : (
                        <div
                          key={area.id}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-brand-500" />
                          {area.city}
                        </div>
                      )
                    ))
                  ) : (
                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-500" />
                      Jakarta (Contoh)
                    </div>
                  )}
                </nav>

                <div className="p-5 sm:p-6 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-brand-900 text-sm">Tidak menemukan kota Anda?</p>
                    <p className="text-xs text-brand-700 font-medium">
                      Hubungi kami untuk pengecekan detail via titik koordinat.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/62895329158096?text=Halo%2C%20saya%20ingin%20cek%20coverage%20area%20FirstMedia%20untuk%20alamat%20saya."
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold py-3 px-5 text-xs sm:text-sm transition-colors shadow-md text-center"
                  >
                    Cek via WhatsApp
                  </a>
                </div>
              </article>
            </div>

            {/* Right: Coverage Request Form Card */}
            <div className="lg:col-span-5">
              <CoverageFormClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

