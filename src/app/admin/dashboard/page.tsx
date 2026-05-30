import { Package, MapPin, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2 font-medium text-lg">Pantau dan kelola konten landing page First Media Anda dari sini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-brand-50 rounded-2xl">
              <Package className="w-6 h-6 text-brand-600" />
            </div>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-900 mb-1">3</h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Paket Aktif</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h3 className="text-4xl font-black text-slate-900 mb-1">10</h3>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">Area Coverage</p>
          </div>
        </div>
      </div>

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
