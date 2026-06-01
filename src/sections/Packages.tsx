import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, ChevronRight, Star } from "lucide-react";

export default async function Packages() {
  const supabase = await createClient();

  const { data: packages, error } = await supabase
    .from("packages")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching packages:", error);
  }

  const activePackages = packages || [];

  return (
    <section id="packages" className="py-24 bg-white border-t border-slate-100 relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-50 rounded-[100%] blur-3xl opacity-60 -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <header className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-2">Pilihan Paket</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Internet Cepat Untuk Semua
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            Pilih paket internet unlimited + TV kabel sesuai dengan kebutuhan aktivitas digital keluarga Anda.
          </p>
        </header>

        <div className="flex flex-nowrap overflow-x-auto pb-8 pt-4 px-4 -mx-4 md:mx-auto md:px-0 gap-4 scroll-smooth snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 items-stretch md:items-end max-w-6xl">
          {activePackages.map((pkg, idx) => {
            const isPopular = pkg.is_popular; // Database-driven highlight

            return (
              <article
                key={pkg.id}
                className={`relative rounded-[2.5rem] flex flex-col h-full transition-all duration-300 w-[320px] min-h-[180px] shrink-0 md:shrink snap-center ${isPopular
                  ? "bg-brand-900 text-white shadow-2xl shadow-brand-900/30 lg:-translate-y-4 border border-brand-800"
                  : "bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-200"
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2 rounded-full text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-accent-500/30 tracking-widest uppercase">
                      <Star className="w-4 h-4 fill-current" />
                      Paling Diminati
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className={`p-5 pb-4 md:p-8 md:pb-6 border-b ${isPopular ? 'border-brand-800' : 'border-slate-100'}`}>
                  <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-brand-200' : 'text-slate-500'}`}>{pkg.name}</h3>
                  <div className="flex flex-col mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-6xl font-black tracking-tighter ${isPopular ? 'text-white' : 'text-brand-800'}`}>
                        {pkg.speed}
                      </span>
                    </div>
                  </div>
                  {pkg.description && (
                    <p className={`text-sm leading-relaxed font-medium min-h-[40px] ${isPopular ? 'text-brand-200' : 'text-slate-600'}`}>
                      {pkg.description}
                    </p>
                  )}
                </div>

                {/* Card Body - Pricing */}
                <div className="p-5 pt-4 md:p-8 md:pt-6 flex flex-col flex-grow">
                  <div className={`mb-6 pb-4 md:mb-8 md:pb-6 border-b ${isPopular ? 'border-brand-800' : 'border-slate-100'}`}>
                    <p className={`text-xs font-bold mb-1 uppercase tracking-wider ${isPopular ? 'text-brand-400' : 'text-slate-400'}`}>Harga berlangganan</p>
                    <div className="flex items-start gap-1">
                      <span className={`text-lg font-bold mt-1 ${isPopular ? 'text-brand-300' : 'text-slate-400'}`}>Rp</span>
                      <span className="text-4xl font-black tracking-tighter">
                        {new Intl.NumberFormat("id-ID").format(Number(pkg.price.replace(/\D/g, '')))}
                      </span>
                      <span className={`text-sm self-end mb-1 ml-1 font-semibold ${isPopular ? 'text-brand-300' : 'text-slate-500'}`}>/bln</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-6 md:mb-10 flex-grow">
                    <p className={`font-bold text-sm ${isPopular ? 'text-white' : 'text-slate-900'}`}>Yang Anda dapatkan:</p>
                    <ul className="space-y-4">
                      {pkg.features?.map((feature, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm font-medium ${isPopular ? 'text-brand-100' : 'text-slate-600'}`}>
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPopular ? 'text-accent-400' : 'text-green-500'}`} />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/62895329158096?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(
                      pkg.name
                    )}%20(${pkg.speed}).%20Mohon%20info%20lebih%20lanjut.`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all text-base ${isPopular
                      ? "bg-accent-500 hover:bg-accent-600 text-white shadow-xl shadow-accent-500/20 active:scale-[0.98]"
                      : "bg-slate-50 border border-slate-200 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 text-slate-700 active:scale-[0.98]"
                      }`}
                  >
                    Pilih Paket Ini
                    <ChevronRight className="w-5 h-5 text-current" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto bg-brand-50 border border-brand-100 rounded-3xl px-8 py-6">
          <div className="text-center sm:text-left">
            <p className="text-brand-900 font-bold text-lg">Bingung memilih paket yang tepat?</p>
            <p className="text-brand-700 text-sm font-medium mt-1">
              Konsultasi gratis dengan tim kami — kami bantu pilih paket terbaik sesuai kebutuhan Anda.
            </p>
          </div>
          <a
            href="https://wa.me/62895329158096?text=Halo%2C%20saya%20butuh%20bantuan%20memilih%20paket%20internet%20First%20Media%20yang%20sesuai%20kebutuhan%20saya."
            target="_blank"
            rel="noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-brand-800 hover:bg-brand-900 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-md active:scale-95 text-sm"
            aria-label="Konsultasi pilihan paket internet via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Konsultasi via WhatsApp
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-400 font-medium text-center">
          *Harga belum termasuk PPN 11% dan biaya perangkat. Syarat dan ketentuan berlaku.
        </p>
      </div>
    </section>
  );
}

