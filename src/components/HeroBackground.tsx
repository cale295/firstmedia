"use client";

import { useEffect, useState } from "react";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#f8fafc] -z-20"></div>;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      {/* Dynamic inline styles for premium animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(15px) rotate(-10deg); }
          }
          @keyframes wifi-pulse {
            0% { opacity: 0.3; transform: scale(0.95); }
            50% { opacity: 0.8; transform: scale(1.02); }
            100% { opacity: 0.3; transform: scale(0.95); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.4; }
          }
          .animate-float-1 {
            animation: float-slow 12s ease-in-out infinite;
          }
          .animate-float-2 {
            animation: float-reverse 16s ease-in-out infinite;
          }
          .animate-float-3 {
            animation: float-slow 20s ease-in-out infinite;
            animation-delay: -3s;
          }
          .animate-wifi {
            animation: wifi-pulse 6s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }
        `
      }} />

      {/* 1. Large Mesh Gradients (Fluid backdrop) */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] -translate-y-1/3 translate-x-1/4 rounded-full opacity-[0.25] mix-blend-multiply filter blur-[120px] bg-gradient-to-tr from-blue-300 via-indigo-200 to-sky-300 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] translate-y-1/4 -translate-x-1/4 rounded-full opacity-[0.2] mix-blend-multiply filter blur-[100px] bg-gradient-to-br from-indigo-300 via-purple-200 to-blue-200 -z-10"></div>
      <div className="absolute top-1/2 left-1/3 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] -translate-y-1/2 rounded-full opacity-[0.15] mix-blend-multiply filter blur-[90px] bg-sky-200 -z-10"></div>

      {/* 2. Grid network nodes background pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] -z-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="networkGrid" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#3b82f6" />
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#networkGrid)" />
      </svg>

      {/* 3. Decorative floating glass cards */}
      <div className="absolute top-[20%] left-[8%] w-48 h-32 bg-white/10 backdrop-blur-[6px] border border-white/20 rounded-2xl shadow-lg shadow-blue-500/5 rotate-[12deg] -z-10 animate-float-1 hidden lg:block">
        <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center border border-white/25">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500/40"></div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-8 left-4 w-1/2 h-2 bg-white/25 rounded-full"></div>
      </div>

      <div className="absolute bottom-[20%] right-[10%] w-56 h-36 bg-white/10 backdrop-blur-[8px] border border-white/25 rounded-[24px] shadow-xl shadow-indigo-500/5 -rotate-[8deg] -z-10 animate-float-2 hidden lg:block">
        <div className="absolute top-5 left-5 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="absolute top-5 right-5 w-12 h-4 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center">
          <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Active</span>
        </div>
        <div className="absolute bottom-5 left-5 right-5 space-y-2">
          <div className="h-2 w-3/4 bg-white/25 rounded-full"></div>
          <div className="h-1.5 w-1/2 bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* 4. Floating decorative circles */}
      <div className="absolute top-[12%] right-[22%] w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400/15 to-blue-500/5 border border-sky-400/20 -z-10 animate-float-3 blur-[1px]"></div>
      <div className="absolute bottom-[10%] left-[15%] w-32 h-32 rounded-full bg-gradient-to-bl from-indigo-400/10 to-purple-500/5 border border-indigo-400/10 -z-10 animate-float-1 blur-[2px]"></div>
      <div className="absolute top-[55%] right-[5%] w-16 h-16 rounded-full bg-gradient-to-r from-blue-400/20 to-sky-400/10 border border-blue-400/15 -z-10 animate-float-2"></div>

      {/* 5. Wifi Wave Accents (SVG vector) */}
      <svg className="absolute top-[15%] right-[40%] w-64 h-64 text-blue-500/10 -z-10 animate-wifi" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 160C100 160 100 160 100 160" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <path d="M85 140C93.2843 131.716 106.716 131.716 115 140" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <path d="M70 120C86.5685 103.431 113.431 103.431 130 120" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M55 100C80.8579 74.1421 122.858 74.1421 148.716 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 80C75.1472 44.8528 132 44.8528 167.147 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 4" />
      </svg>

      {/* 6. Network connection lines & nodes */}
      <svg className="absolute bottom-[25%] left-[25%] w-80 h-60 text-indigo-500/20 -z-10 animate-pulse-slow hidden md:block" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Nodes */}
        <circle cx="50" cy="50" r="4" fill="currentColor" />
        <circle cx="150" cy="30" r="3" fill="currentColor" />
        <circle cx="250" cy="80" r="5" fill="currentColor" />
        <circle cx="100" cy="140" r="4.5" fill="currentColor" />
        <circle cx="220" cy="150" r="3.5" fill="currentColor" />

        {/* Connection lines */}
        <line x1="50" y1="50" x2="150" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="150" y1="30" x2="250" y2="80" stroke="currentColor" strokeWidth="1" />
        <line x1="50" y1="50" x2="100" y2="140" stroke="currentColor" strokeWidth="1.5" />
        <line x1="100" y1="140" x2="220" y2="150" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
        <line x1="220" y1="150" x2="250" y2="80" stroke="currentColor" strokeWidth="1" />
        <line x1="150" y1="30" x2="100" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />

        {/* Halo rings */}
        <circle cx="250" cy="80" r="12" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
        <circle cx="100" cy="140" r="10" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {/* 7. Subtle geometric details */}
      <svg className="absolute top-[8%] left-[25%] w-8 h-8 text-blue-500/15 -z-10 animate-float-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    </div>
  );
}
