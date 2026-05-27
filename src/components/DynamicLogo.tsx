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

          {/* Syriac Cross SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="z-10 transition-transform duration-500 group-hover:scale-110"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f0d5a3" />
                <stop offset="50%" stopColor="#e2b56f" />
                <stop offset="100%" stopColor="#cfa24f" />
              </linearGradient>
            </defs>
            {/* Elegant Syriac Cross design with three points on each arm */}
            {/* Center block */}
            <rect x="11.5" y="11.5" width="1" height="1" fill="#e2b56f" />
            {/* Vertical stem */}
            <path d="M12 4v16" />
            {/* Horizontal beam */}
            <path d="M4 12h16" />
            
            {/* Trinity Buds (Tri-points) on each of the 4 ends */}
            {/* Top */}
            <circle cx="12" cy="3" r="0.75" fill="#e2b56f" />
            <circle cx="11" cy="4" r="0.5" fill="#e2b56f" />
            <circle cx="13" cy="4" r="0.5" fill="#e2b56f" />
            
            {/* Bottom */}
            <circle cx="12" cy="21" r="0.75" fill="#e2b56f" />
            <circle cx="11" cy="20" r="0.5" fill="#e2b56f" />
            <circle cx="13" cy="20" r="0.5" fill="#e2b56f" />

            {/* Left */}
            <circle cx="3" cy="12" r="0.75" fill="#e2b56f" />
            <circle cx="4" cy="11" r="0.5" fill="#e2b56f" />
            <circle cx="4" cy="12" r="0.5" fill="#e2b56f" /> {/** duplicate but smaller, to align */}
            <circle cx="4" cy="13" r="0.5" fill="#e2b56f" />

            {/* Right */}
            <circle cx="21" cy="12" r="0.75" fill="#e2b56f" />
            <circle cx="20" cy="11" r="0.5" fill="#e2b56f" />
            <circle cx="20" cy="13" r="0.5" fill="#e2b56f" />
          </svg>
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
