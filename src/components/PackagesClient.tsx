"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Star } from "lucide-react";
import { Database } from "@/types/database.types";

type Package = Database["public"]["Tables"]["packages"]["Row"];

export default function PackagesClient({ packages }: { packages: Package[] }) {
  const [activeTab, setActiveTab] = useState<"internet_only" | "internet_tv">("internet_only");

  // Filter packages based on active/inactive status is already done by the database query in server component.
  // We just filter by category here.
  const internetOnlyPackages = packages.filter((p) => p.category === "internet_only");
  const internetTvPackages = packages.filter((p) => p.category === "internet_tv");

  const displayedPackages = activeTab === "internet_only" ? internetOnlyPackages : internetTvPackages;

  return (
    <div className="space-y-12">
      {/* Category Tabs Selector with Counts */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1.5 rounded-2xl flex inline-flex items-center gap-1 border border-slate-200/60 shadow-inner relative">
          <button
            onClick={() => setActiveTab("internet_only")}
            className={`px-5 py-3 rounded-xl text-sm font-black transition-colors duration-200 relative z-10 select-none cursor-pointer ${
              activeTab === "internet_only" ? "text-brand-900" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Internet Only ({internetOnlyPackages.length})
            {activeTab === "internet_only" && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("internet_tv")}
            className={`px-5 py-3 rounded-xl text-sm font-black transition-colors duration-200 relative z-10 select-none cursor-pointer ${
              activeTab === "internet_tv" ? "text-brand-900" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Internet + TV ({internetTvPackages.length})
            {activeTab === "internet_tv" && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Package Grid with AnimatePresence */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {displayedPackages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center py-16 px-4 bg-slate-50 border border-slate-200/60 rounded-[2.5rem] max-w-lg mx-auto shadow-sm"
            >
              <p className="text-slate-600 font-bold text-base md:text-lg">
                Tidak ada paket tersedia saat ini.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-nowrap overflow-x-auto pb-8 pt-4 px-4 -mx-4 md:mx-auto md:px-0 gap-4 scroll-smooth snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8 items-stretch md:items-end max-w-6xl"
            >
              {displayedPackages.map((pkg) => {
                const isPopular = pkg.is_popular;

                return (
                  <article
                    key={pkg.id}
                    className={`relative rounded-[2.5rem] flex flex-col h-full transition-all duration-300 w-[320px] min-h-[180px] shrink-0 md:shrink snap-center ${
                      isPopular
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
                    <div className={`p-5 pb-4 md:p-8 md:pb-6 border-b ${isPopular ? "border-brand-800" : "border-slate-100"}`}>
                      <h3 className={`text-xl font-bold mb-2 ${isPopular ? "text-brand-200" : "text-slate-500"}`}>
                        {pkg.name}
                      </h3>
                      <div className="flex flex-col mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-6xl font-black tracking-tighter ${isPopular ? "text-white" : "text-brand-800"}`}>
                            {pkg.speed}
                          </span>
                        </div>
                      </div>
                      {pkg.description && (
                        <p className={`text-sm leading-relaxed font-medium min-h-[40px] ${isPopular ? "text-brand-200" : "text-slate-600"}`}>
                          {pkg.description}
                        </p>
                      )}
                    </div>

                    {/* Card Body - Pricing */}
                    <div className="p-5 pt-4 md:p-8 md:pt-6 flex flex-col flex-grow">
                      <div className={`mb-6 pb-4 md:mb-8 md:pb-6 border-b ${isPopular ? "border-brand-800" : "border-slate-100"}`}>
                        <p className={`text-xs font-bold mb-1 uppercase tracking-wider ${isPopular ? "text-brand-400" : "text-slate-400"}`}>
                          Harga berlangganan
                        </p>
                        <div className="flex items-start gap-1">
                          <span className={`text-lg font-bold mt-1 ${isPopular ? "text-brand-300" : "text-slate-400"}`}>Rp</span>
                          <span className="text-4xl font-black tracking-tighter">
                            {new Intl.NumberFormat("id-ID").format(Number(pkg.price.replace(/\D/g, "")))}
                          </span>
                          <span className={`text-sm self-end mb-1 ml-1 font-semibold ${isPopular ? "text-brand-300" : "text-slate-500"}`}>
                            /bln
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-6 md:mb-10 flex-grow">
                        <p className={`font-bold text-sm ${isPopular ? "text-white" : "text-slate-900"}`}>
                          Yang Anda dapatkan:
                        </p>
                        <ul className="space-y-4">
                          {pkg.features?.map((feature, i) => (
                            <li key={i} className={`flex items-start gap-3 text-sm font-medium ${isPopular ? "text-brand-100" : "text-slate-600"}`}>
                              <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPopular ? "text-accent-400" : "text-green-500"}`} />
                              <span className="leading-tight">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Call to Action */}
                      <a
                        href={`https://wa.me/62895329158096?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20${encodeURIComponent(
                          pkg.name
                        )}%20(${pkg.speed}).%20Mohon%20info%20lebih%20lanjut.`}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all text-base ${
                          isPopular
                            ? "bg-accent-500 hover:bg-accent-600 text-white shadow-xl shadow-accent-500/20 active:scale-[0.98]"
                            : "bg-slate-50 border border-slate-200 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 text-slate-700 active:scale-[0.98]"
                        }`}
                      >
                        Pilih Paket Ini
                        <ChevronRight className="w-5 h-5 text-current" />
                      </a>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
