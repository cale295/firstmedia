"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    q: "Berapa lama proses instalasi First Media?",
    a: "Proses instalasi biasanya memakan waktu 1-3 hari kerja setelah pendaftaran disetujui, bergantung pada tingkat antrean di area dan ketersediaan teknisi kami.",
  },
  {
    q: "Apakah ada biaya pemasangan awal?",
    a: "Untuk bulan ini, kami memberikan promo BEBAS BIAYA PASANG (Gratis Instalasi) untuk pendaftaran paket internet pilihan. Hubungi agen kami untuk detail promo area Anda.",
  },
  {
    q: "Apakah STB (Set Top Box) dan Router sudah termasuk?",
    a: "Ya, harga paket bulanan yang tertera sudah termasuk peminjaman Set Top Box (untuk paket TV Kabel) dan Router Wi-Fi canggih selama Anda berlangganan.",
  },
  {
    q: "Bagaimana cara pindah alamat (relokasi)?",
    a: "Anda dapat menghubungi Customer Service kami melalui aplikasi MyFirstMedia atau call center untuk memproses pengajuan relokasi alamat dengan mudah.",
  },
  {
    q: "Apakah layanannya unlimited tanpa FUP?",
    a: "Betul sekali! Layanan internet First Media bersifat Truly Unlimited tanpa batasan kuota (FUP), sehingga Anda bisa streaming dan gaming sepuasnya kapan saja.",
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-2">
            <MessageCircleQuestion className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-brand-600 font-bold tracking-widest uppercase text-sm">Pusat Bantuan</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Pertanyaan Umum
          </h3>
          <p className="text-slate-600 text-lg font-medium">
            Temukan jawaban cepat seputar pemasangan dan layanan First Media.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                    ? "bg-white shadow-lg shadow-brand-900/5 border-brand-200"
                    : "bg-white border-slate-200 hover:border-brand-300 hover:shadow-md"
                  }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className={`font-bold text-lg transition-colors ${isOpen ? "text-brand-700" : "text-slate-800"}`}>
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-full transition-colors shrink-0 ${isOpen ? "bg-brand-50 text-brand-600" : "bg-slate-50 text-slate-400"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="h-px w-full bg-slate-100 mb-4"></div>
                  <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
