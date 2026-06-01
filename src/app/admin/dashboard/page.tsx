"use client";

import { Package, MapPin, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { StatsCard } from "@/components/admin/StatsCard";

export default function DashboardOverview() {
  const { activePackagesCount, activeAreasCount, loading, error, refresh } = useDashboardStats();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2 font-medium text-lg">Pantau dan kelola konten landing page First Media Anda dari sini.</p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-900">Gagal Memuat Data</h3>
              <p className="text-sm text-red-700 mt-1">{error.message || "Terjadi kesalahan saat mengambil statistik dari database."}</p>
            </div>
          </div>
          <button
            onClick={() => refresh()}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl transition-colors font-semibold text-sm shrink-0 shadow-sm active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          <StatsCard
            icon={Package}
            label="Total Packages"
            count={activePackagesCount}
            loading={loading}
            iconBgColor="bg-brand-50"
            iconColor="text-brand-600"
          />

          <StatsCard
            icon={MapPin}
            label="Total Coverage Areas"
            count={activeAreasCount}
            loading={loading}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Aksi Cepat</h2>
          <div className="space-y-4">
            <Link href="/admin/dashboard/packages" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-brand-50 border border-slate-100 hover:border-brand-200 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm"><Package className="w-5 h-5 text-brand-600" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-brand-700">Kelola Paket</h4>
                  <p className="text-xs text-slate-500 font-medium">Tambah atau edit harga paket internet.</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
            </Link>
            
            <Link href="/admin/dashboard/areas" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-xl shadow-sm"><MapPin className="w-5 h-5 text-blue-500" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-700">Kelola Area</h4>
                  <p className="text-xs text-slate-500 font-medium">Kelola wilayah cakupan layanan (coverage areas).</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
