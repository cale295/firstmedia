"use client";

import { Check, Users, Globe, Smile } from "lucide-react";
import { motion } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";
import CoverageCheckerHeroForm from "@/components/Coverage/CoverageCheckerHeroForm";

interface HeroProps {
  localArea?: string;
}

export default function Hero({ localArea }: HeroProps) {
  const trustIndicators = [
    "Gratis cek coverage",
    "Instalasi cepat",
    "Respon cepat via WhatsApp",
    "Teknisi resmi",
  ];

  const stats = [
    { value: "1000+", label: "Pelanggan Terlayani", icon: Users },
    { value: "15+", label: "Area Coverage", icon: Globe },
    { value: "99%", label: "Customer Satisfaction", icon: Smile },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative min-h-screen pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-32 lg:pb-28 flex items-center overflow-hidden">
      {/* Premium Background Composition */}
      <HeroBackground />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full"
        >
          {/* LEFT COLUMN: Marketing Content */}
          <div className="w-full lg:w-7/12 flex flex-col space-y-6 text-center lg:text-left">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 text-xs font-black uppercase tracking-widest px-4.5 py-2 rounded-full shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
                Authorized First Media Partner
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[60px] font-black text-slate-900 leading-[1.15] tracking-tight"
            >
              Cek Ketersediaan Internet <br className="hidden sm:block" /> First Media di{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                {localArea || "Lokasi Anda"}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-600 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Masukkan data Anda dan tim kami akan menghubungi melalui WhatsApp untuk mengonfirmasi apakah lokasi Anda sudah tercover jaringan.
            </motion.p>

            {/* Trust Indicators */}
            <motion.ul
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-slate-700 font-bold text-sm sm:text-base max-w-md mx-auto lg:mx-0 pt-2"
            >
              {trustIndicators.map((item, idx) => (
                <li key={idx} className="flex items-center justify-center lg:justify-start gap-2.5">
                  <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3.5} />
                  </div>
                  <span className="tracking-wide">{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* Social Proof statistic cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 max-w-lg mx-auto lg:mx-0 w-full"
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/40 hover:bg-white/80 backdrop-blur-md border border-slate-200/50 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 hover:-translate-y-1 transition-all duration-300 p-3.5 sm:p-5 rounded-2xl text-center group cursor-pointer"
                >
                  <p className="text-2xl sm:text-3xl font-black text-brand-600 leading-none mb-1.5 transition-colors group-hover:text-brand-700">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Coverage form card */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-5/12 max-w-md mx-auto lg:mr-0 xl:mr-4 z-20"
          >
            <CoverageCheckerHeroForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
