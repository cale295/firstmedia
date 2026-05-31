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

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 font-medium">
            *Harga belum termasuk PPN 11% dan biaya perangkat. Syarat dan ketentuan berlaku.
          </p>
        </div>
      </div>
    </section>
  );
}
