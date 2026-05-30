import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paketfirstmedia.web.id"),
  title: {
    template: "%s | FirstMedia ISP",
    default: "Pasang First Media Jabodetabek | Internet Fiber Optic Cepat",
  },
  description:
    "Pasang First Media untuk area Jakarta, Tangerang, Bekasi, Depok, Bogor dan sekitarnya. Internet Fiber Optic cepat, stabil, dan cocok untuk streaming, gaming, serta work from home.",
  keywords: [
    "Pasang First Media",
    "First Media Jakarta",
    "First Media Tangerang",
    "First Media Bekasi",
    "First Media Depok",
    "First Media Bogor",
    "First Media Tangerang Selatan",
    "Internet Fiber Optic",
    "Pasang WiFi Rumah",
    "Internet Rumah Cepat",
  ],
  authors: [{ name: "FirstMedia ISP" }],
  creator: "FirstMedia ISP",
  openGraph: {
    locale: "id_ID",
    type: "website",
    title: "Pasang First Media Jabodetabek | Internet Fiber Optic Cepat",
    description: "Pasang First Media untuk area Jakarta, Tangerang, Bekasi, Depok, Bogor dan sekitarnya. Internet Fiber Optic cepat, stabil, dan cocok untuk streaming, gaming, serta work from home.",
    url: "https://paketfirstmedia.web.id",
    siteName: "FirstMedia ISP",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pasang First Media Internet Fiber Optic Cepat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pasang First Media Jabodetabek | Internet Fiber Optic Cepat",
    description: "Pasang First Media untuk area Jakarta, Tangerang, Bekasi, Depok, Bogor dan sekitarnya. Internet Fiber Optic cepat, stabil, dan cocok untuk streaming, gaming, serta work from home.",
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
    canonical: "https://paketfirstmedia.web.id",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "FirstMedia ISP",
  "image": "https://paketfirstmedia.web.id/og-image.jpg",
  "description": "Pasang First Media untuk area Jakarta, Tangerang, Bekasi, Depok, Bogor dan sekitarnya. Internet Fiber Optic cepat, stabil, dan cocok untuk streaming, gaming, serta work from home.",
  "url": "https://paketfirstmedia.web.id",
  "telephone": "+62895329158096",
  "areaServed": [
    "Jakarta",
    "Tangerang",
    "Bekasi",
    "Depok",
    "Bogor",
    "Tangerang Selatan"
  ]
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans text-slate-800 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
