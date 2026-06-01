/**
 * StructuredData — FAQ JSON-LD schema for homepage rich results.
 * Renders as an inline <script type="application/ld+json"> in the <head>.
 * This is a Server Component — no client JS needed.
 */

const faqs = [
  {
    question: "Berapa lama proses instalasi First Media?",
    answer:
      "Proses instalasi biasanya memakan waktu 1-3 hari kerja setelah pendaftaran disetujui, bergantung pada tingkat antrean di area dan ketersediaan teknisi kami.",
  },
  {
    question: "Apakah ada biaya pemasangan awal?",
    answer:
      "Untuk bulan ini, kami memberikan promo BEBAS BIAYA PASANG (Gratis Instalasi) untuk pendaftaran paket internet pilihan. Hubungi agen kami untuk detail promo area Anda.",
  },
  {
    question: "Apakah STB (Set Top Box) dan Router sudah termasuk?",
    answer:
      "Ya, harga paket bulanan yang tertera sudah termasuk peminjaman Set Top Box (untuk paket TV Kabel) dan Router Wi-Fi canggih selama Anda berlangganan.",
  },
  {
    question: "Bagaimana cara pindah alamat (relokasi)?",
    answer:
      "Anda dapat menghubungi Customer Service kami melalui aplikasi MyFirstMedia atau call center untuk memproses pengajuan relokasi alamat dengan mudah.",
  },
  {
    question: "Apakah layanannya unlimited tanpa FUP?",
    answer:
      "Betul sekali! Layanan internet First Media bersifat Truly Unlimited tanpa batasan kuota (FUP), sehingga Anda bisa streaming dan gaming sepuasnya kapan saja.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
