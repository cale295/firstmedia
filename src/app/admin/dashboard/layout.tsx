"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  MapPin,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const NAV_LINKS = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Packages", href: "/admin/dashboard/packages", icon: Package },
  { name: "Coverage Areas", href: "/admin/dashboard/areas", icon: MapPin },
];

function SidebarContent({
  pathname,
  user,
  logout,
  onClose,
}: {
  pathname: string;
  user: { email?: string } | null;
  logout: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-brand-900 text-white">
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-brand-800">
        <Link
          href="/admin/dashboard"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
            <ShieldCheck className="w-6 h-6 text-accent-400" />
          </div>
          <div>
            <span className="block text-sm font-black tracking-widest uppercase text-brand-200">First Media</span>
            <span className="block text-base font-bold text-white leading-none">Admin Portal</span>
          </div>
        </Link>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-brand-300 hover:text-white hover:bg-brand-800 transition lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 mb-2">Menu Utama</p>
        {NAV_LINKS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-bold ${
                isActive
                  ? "bg-brand-800 text-white shadow-inner"
                  : "text-brand-200 hover:bg-brand-800/50 hover:text-white"
              }`}
            >
              <item.icon
                className={`w-5 h-5 shrink-0 ${isActive ? "text-accent-400" : "text-brand-400"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User info & Logout */}
      <div className="p-4 border-t border-brand-800 bg-brand-950/30">
        {user?.email && (
          <div className="px-4 py-3 mb-2 bg-brand-800/50 rounded-xl border border-brand-700/50">
            <p className="text-[10px] text-brand-400 font-bold uppercase tracking-wider mb-1">Signed in as</p>
            <p className="text-sm font-bold text-white truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 px-4 py-3.5 w-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors shadow-md shadow-red-900/20"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:left-0 z-30 shadow-2xl shadow-brand-900/20">
        <SidebarContent
          pathname={pathname}
          user={user}
          logout={logout}
        />
      </aside>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-brand-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-80 bg-brand-900 z-50 lg:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin sidebar"
      >
        <SidebarContent
          pathname={pathname}
          user={user}
          logout={logout}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 lg:pl-72">
        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            <span className="text-lg font-black text-slate-900 tracking-tight">Admin Portal</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
