import { MapPin, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { IMAGES } from "@/constants/images";
import CoverageMapClient from "@/components/Map/CoverageMapClient";

export default async function Coverage() {
  const supabase = await createClient();
  const { data: areas, error } = await supabase
    .from("areas")
    .select("*")
    .eq("active", true)
    .order("city", { ascending: true });

  const activeAreas = areas || [];

  return (
    <section id="coverage" className="py-24 bg-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">

          {/* Interactive Map Component */}
          <div className="w-full lg:flex-1 relative z-10 h-[320px] sm:h-[400px] lg:h-[500px]">
            {/* The decorative offset background using fiber network image */}
            <div className="absolute inset-0 rounded-3xl transform -rotate-3 scale-[1.02] -z-10 overflow-hidden shadow-2xl">
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

          <div className="flex-1 space-y-10">
            <header className="space-y-4">
              <p className="text-brand-600 font-bold tracking-widest uppercase text-sm">Target Area</p>
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
                Apakah Area Anda Sudah Terjangkau?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Cek ketersediaan layanan First Media di kota atau area perumahan Anda melalui peta interaktif kami. Kami terus memperluas jaringan untuk layanan yang lebih maksimal.
              </p>
            </header>

            <article className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative">
              <div className="absolute -top-4 -left-4 bg-accent-500 p-3 rounded-2xl shadow-lg shadow-accent-500/30">
                <Search className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-black text-slate-900 text-xl mb-2 ml-6">Area Tersedia Saat Ini</h3>
              <p className="text-sm text-slate-500 mb-6 ml-6 font-medium">Beberapa kota yang sudah didukung penuh oleh jaringan fiber optic kami:</p>

              {/* SEO Friendly Text Content with Internal Links */}
              <nav className="flex flex-wrap gap-3 mb-8 ml-6 max-h-[170px] overflow-y-auto pr-2 custom-scrollbar">
                {activeAreas.length > 0 ? (
                  activeAreas.map((area) => (
                    area.slug ? (
                      <a href={`/first-media-${area.slug}`} key={area.id} className="px-4 py-2 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {area.city}
                      </a>
                    ) : (
                      <div key={area.id} className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {area.city}
                      </div>
                    )
                  ))
                ) : (
                  <div className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-sm font-bold flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" />
                    Jakarta (Contoh)
                  </div>
                )}
              </nav>

              <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-brand-900 text-sm">Tidak menemukan kota Anda?</p>
                  <p className="text-xs text-brand-700 mt-1 font-medium">Hubungi kami untuk pengecekan detail via titik koordinat.</p>
                </div>
                <a
                  href="https://wa.me/62895329158096?text=Halo%2C%20saya%20ingin%20cek%20coverage%20area%20FirstMedia%20untuk%20alamat%20saya."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-bold py-3 px-6 text-sm transition-colors shadow-md"
                >
                  Cek via WhatsApp
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
