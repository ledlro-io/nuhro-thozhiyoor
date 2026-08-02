"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DynamicLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div
        className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Radial background aura */}
        <div
          className={`absolute inset-0 rounded-full bg-gold-primary transition-all duration-700 blur-[8px] ${
            isHovered ? "opacity-60 scale-125" : "opacity-25 scale-100"
          }`}
          style={{ mixBlendMode: "screen" }}
        />

        {/* Outer rotating light rays (only visible on hover/active) */}
        <motion.svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          className="absolute pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {/* Ray lines */}
          {Array.from({ length: 8 }).map((_, idx) => (
            <line
              key={idx}
              x1="50"
              y1="50"
              x2="50"
              y2="10"
              stroke="#e2b56f"
              strokeWidth="1.5"
              strokeDasharray="4,6"
              transform={`rotate(${idx * 45} 50 50)`}
              className={`transition-opacity duration-500 ${
                isHovered ? "opacity-40" : "opacity-0"
              }`}
            />
          ))}
        </motion.svg>

        {/* Main Logo Container */}
        <div className="relative w-10 h-10 rounded-full border border-gold-primary/30 bg-background flex items-center justify-center glass-panel shadow-gold-glow">
          {/* Pulsing glow ring inside */}
          <div className="absolute inset-1 rounded-full border border-gold-primary/10 animate-ping" style={{ animationDuration: "3s" }} />

          {/* Syriac Cross SVG replaced with our beautiful custom logo.jpg */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="Nuhro Thozhiyoor Logo"
            className="w-full h-full object-cover rounded-full z-10 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Typography: Text Logo */}
      <div className="flex flex-col">
        <span className="font-playfair text-lg md:text-xl font-bold tracking-wider gold-gradient-text">
          NUHRO THOZHIYOOR
        </span>
        <div className="flex items-center gap-1.5 -mt-1">
          {/* Syriac text: ܢܘܗܪܐ meaning Light */}
          <span className="text-[10px] text-gold-primary/80 font-serif tracking-widest">
            ܢܘܗܪܐ
          </span>
          <span className="text-[8px] text-mutedText tracking-widest uppercase">
            Heritage Archive
          </span>
        </div>
      </div>
    </Link>
  );
}
