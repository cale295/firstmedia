import { createClient } from "@/lib/supabase/server";
import PackagesClient from "@/components/PackagesClient";

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

        <PackagesClient packages={activePackages} />

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

