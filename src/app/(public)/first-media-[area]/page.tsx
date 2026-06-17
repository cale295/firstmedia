import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Packages from "@/sections/Packages";
import Coverage from "@/sections/Coverage";
import { Phone } from "lucide-react";


interface Props {
  params: Promise<{ area: string }>;
}

function formatArea(area: string): string {
  return area.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  const formattedArea = formatArea(area || "");
  const title = `Pasang First Media ${formattedArea} | Internet Fiber Cepat`;
  const description = `Pasang internet fiber optic First Media di ${formattedArea}. Nikmati koneksi unlimited tanpa FUP, kecepatan hingga 500 Mbps, dan TV Kabel 150+ channel. Hubungi sales resmi untuk pemasangan cepat di ${formattedArea}.`;
  const canonicalUrl = `https://firstmedia-xlsatu.id/first-media-${area}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "id_ID",
      siteName: "FirstMedia ISP",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Pasang First Media di ${formattedArea} — Internet Fiber Optic`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
}

/** Localized content block — unique organic SEO copy per area page */
function LocalAreaContent({ area }: { area: string }) {
  return (
    <section
      className="py-16 bg-white border-t border-slate-100"
      aria-label={`Layanan First Media di ${area}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-brand-600 font-bold tracking-widest uppercase text-sm">
              Layanan Lokal
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Internet Fiber Optic di {area}
            </h2>
            <p className="text-slate-600 text-lg font-medium leading-relaxed">
              First Media hadir di {area} dengan infrastruktur fiber optic 100% yang memberikan kecepatan simetris upload and download hingga 500 Mbps — tanpa batasan kuota, tanpa gangguan.
            </p>
            <p className="text-slate-600 font-medium leading-relaxed">
              Lebih dari ribuan pelanggan di {area} telah menikmati layanan streaming, gaming, dan kerja dari rumah yang lebih lancar bersama First Media. Teknisi berpengalaman kami siap melakukan instalasi di {area} dalam 1–3 hari kerja.
            </p>
          </div>

          <div className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-3xl p-8 text-white space-y-6 shadow-2xl shadow-brand-900/20">
            <div className="space-y-2">
              <p className="text-brand-300 text-sm font-bold uppercase tracking-widest">Tersedia di {area}</p>
              <p className="text-2xl font-black leading-tight">Konsultasi Paket Internet Gratis</p>
              <p className="text-brand-200 text-sm font-medium">
                Tim kami siap membantu memilih paket terbaik sesuai kebutuhan dan anggaran Anda di {area}.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-brand-100 font-medium">
              {[
                "Kecepatan hingga 500 Mbps",
                "Internet unlimited tanpa FUP",
                "TV Kabel 150+ channel",
                "Instalasi cepat 1–3 hari",
                "Teknisi profesional bersertifikat",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/62895329158096?text=Halo%2C%20saya%20ingin%20pasang%20First%20Media%20di%20${encodeURIComponent(area)}.%20Mohon%20info%20paket%20dan%20coverage%20area.`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-accent-500/30 active:scale-[0.98]"
              aria-label={`Daftar First Media di ${area} via WhatsApp`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Pasang di {area} via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function LocalAreaPage({ params }: Props) {
  const { area } = await params;
  const formattedArea = formatArea(area || "");
  return (
    <>
      <Hero localArea={formattedArea} />
      <LocalAreaContent area={formattedArea} />
      <Packages />
      <Features />
      <Coverage />
    </>
  );
}

