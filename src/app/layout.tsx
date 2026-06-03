import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://firstmedia-xlsatu.id"),
  title: {
    template: "%s | FirstMedia ISP",
    default: "Pasang First Media & XL SATU | Internet Fiber Cepat Jabodetabek",
  },
  description:
    "Pasang internet First Media dan XL SATU untuk rumah dan bisnis. Cek coverage area, pilih paket internet fiber terbaik, dan hubungi sales resmi untuk pemasangan cepat.",
  keywords: [
    "first media",
    "pasang first media",
    "paket first media",
    "internet fiber",
    "xl satu",
    "paket xl satu",
    "internet rumah",
    "internet cepat",
    "wifi rumah",
    "internet jabodetabek",
    "First Media Jakarta",
    "First Media Tangerang",
    "First Media Bekasi",
    "First Media Depok",
    "First Media Bogor",
    "Internet Fiber Optic",
    "Pasang WiFi Rumah",
    "Internet Unlimited",
  ],
  authors: [{ name: "FirstMedia ISP" }],
  creator: "FirstMedia ISP",
  openGraph: {
    locale: "id_ID",
    type: "website",
    title: "Pasang First Media & XL SATU | Internet Fiber Cepat Jabodetabek",
    description:
      "Pasang internet First Media dan XL SATU untuk rumah dan bisnis. Cek coverage area, pilih paket internet fiber terbaik, dan hubungi sales resmi untuk pemasangan cepat.",
    url: "https://firstmedia-xlsatu.id",
    siteName: "FirstMedia ISP",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pasang First Media & XL SATU — Internet Fiber Optic Cepat Jabodetabek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasang First Media & XL SATU | Internet Fiber Cepat Jabodetabek",
    description:
      "Pasang internet First Media dan XL SATU untuk rumah dan bisnis. Cek coverage area, pilih paket internet fiber terbaik, dan hubungi sales resmi untuk pemasangan cepat.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://firstmedia-xlsatu.id",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FirstMedia ISP — Sales Partner Resmi",
  url: "https://firstmedia-xlsatu.id",
  logo: "https://firstmedia-xlsatu.id/images/logos/firstmedia-logo.png",
  telephone: "+62895329158096",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62895329158096",
    contactType: "sales",
    areaServed: "ID",
    availableLanguage: "Indonesian",
  },
  areaServed: [
    "Jakarta",
    "Jakarta Selatan",
    "Jakarta Barat",
    "Jakarta Timur",
    "Jakarta Utara",
    "Tangerang",
    "Tangerang Selatan",
    "Bekasi",
    "Depok",
    "Bogor",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "FirstMedia ISP — Agen Penjualan Resmi",
  description:
    "Agen penjualan resmi First Media dan XL SATU untuk layanan internet fiber optic rumah dan bisnis di wilayah Jabodetabek.",
  url: "https://firstmedia-xlsatu.id",
  telephone: "+62895329158096",
  image: "https://firstmedia-xlsatu.id/images/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Jend. Sudirman Kav. 21",
    addressLocality: "Jakarta Selatan",
    addressRegion: "DKI Jakarta",
    postalCode: "12920",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.2087634,
    longitude: 106.845599,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  areaServed: [
    { "@type": "City", name: "Jakarta" },
    { "@type": "City", name: "Tangerang" },
    { "@type": "City", name: "Tangerang Selatan" },
    { "@type": "City", name: "Bekasi" },
    { "@type": "City", name: "Depok" },
    { "@type": "City", name: "Bogor" },
  ],
  priceRange: "Rp 299.000 - Rp 799.000/bulan",
};

/**
 * Root layout — bare HTML shell only.
 * Public pages use (public)/layout.tsx for Navbar + Footer.
 * Admin pages use /admin/layout.tsx for the dashboard shell.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`scroll-smooth ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen font-sans text-slate-800 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
