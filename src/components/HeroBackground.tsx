"use client";

import { useEffect, useState } from "react";

export default function HeroBackground() {
  // Prevent hydration mismatch for complex DOM/CSS attributes if needed,
  // though pure CSS/SVG is usually fine. We'll stick to simple static rendering
  // for performance, since nothing here depends on window size directly in JS.

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-white">
      {/* 1. Subtle Noise Texture (Base Layer) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* 2. Brand Gradient Blurs (Hardware Accelerated) */}
      {/* Large red blur — top right */}
      <div
        className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, #E30613 0%, transparent 60%)",
          opacity: 0.08,
          filter: "blur(60px)",
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      />

      {/* Large dark blue blur — bottom left */}
      <div
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, #002D72 0%, transparent 60%)",
          opacity: 0.1,
          filter: "blur(70px)",
          transform: "translate3d(0,0,0)",
          willChange: "transform",
        }}
      />
      
      {/* Soft light blue accent — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full hidden md:block"
        style={{
          background: "radial-gradient(circle, #00AEEF 0%, transparent 60%)",
          opacity: 0.05,
          filter: "blur(50px)",
          transform: "translate3d(-50%,-50%,0)",
          willChange: "transform",
        }}
      />

      {/* 3. Central Soft White Glow (Improves text readability) */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 40% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)",
        }}
      />

      {/* 4. Abstract Telecom SVGs (Hidden on mobile for performance/clutter) */}
      <svg
        className="absolute inset-0 w-full h-full hidden md:block opacity-[0.15]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Network Node Grid (Dots) */}
        <defs>
          <pattern id="dotGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#002D72" opacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGrid)" />

        {/* Circular Dashed Connection Rings (Bottom Right) */}
        <g transform="translate(100%, 100%)" opacity="0.4">
          <circle cx="0" cy="0" r="300" fill="none" stroke="#00AEEF" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="0" cy="0" r="450" fill="none" stroke="#002D72" strokeWidth="1" strokeDasharray="2 8" />
          <circle cx="0" cy="0" r="600" fill="none" stroke="#E30613" strokeWidth="1" strokeDasharray="8 16" opacity="0.5" />
        </g>

        {/* Circular Dashed Connection Rings (Top Left) */}
        <g transform="translate(0, 0)" opacity="0.3">
          <circle cx="0" cy="0" r="200" fill="none" stroke="#E30613" strokeWidth="1" strokeDasharray="4 12" />
          <circle cx="0" cy="0" r="350" fill="none" stroke="#002D72" strokeWidth="1" strokeDasharray="6 14" />
        </g>

        {/* Fiber Optic Flowing Lines (Sweeping across) */}
        <path
          d="M -100 600 C 300 600, 500 200, 1200 300 S 1800 100, 2200 400"
          fill="none"
          stroke="#E30613"
          strokeWidth="1.5"
          strokeDasharray="6 12"
          opacity="0.6"
        />
        <path
          d="M -100 650 C 400 650, 600 250, 1300 350 S 1900 150, 2300 450"
          fill="none"
          stroke="#00AEEF"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.8"
        />
        <path
          d="M -100 700 C 500 700, 700 300, 1400 400 S 2000 200, 2400 500"
          fill="none"
          stroke="#002D72"
          strokeWidth="0.5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
