import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import Packages from "@/sections/Packages";
import Coverage from "@/sections/Coverage";

interface Props {
  params: Promise<{ area: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params;
  
  // Clean area name, e.g., "jakarta" -> "Jakarta", "tangerang-selatan" -> "Tangerang Selatan"
  const formattedArea = area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `Pasang First Media ${formattedArea} | Promo Internet Cepat`;
  const description = `Promo pasang First Media khusus area ${formattedArea}. Nikmati koneksi internet fiber optic super cepat, stabil, dan unlimited. Daftar via WhatsApp sekarang!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://paketfirstmedia.web.id/first-media-${area}`,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Pasang First Media di ${formattedArea}`,
        },
      ],
    },
    alternates: {
      canonical: `https://paketfirstmedia.web.id/first-media-${area}`,
    },
  };
}

export default async function LocalAreaPage({ params }: Props) {
  const { area } = await params;
  
  const formattedArea = area
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Hero localArea={formattedArea} />
      <Features />
      <Packages />
      <Coverage />
    </>
  );
}
