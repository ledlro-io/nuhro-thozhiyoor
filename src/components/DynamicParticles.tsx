"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
}

export default function DynamicParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate static particle layout on component mount to prevent server mismatch
    const generated: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20, // slow speed
      delay: Math.random() * -20, // start immediately at random offsets
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] radial-glow opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[50vw] h-[50vw] radial-glow opacity-40" />

      {/* Floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-gold-primary/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            filter: "blur(0.5px)",
            opacity: Math.random() * 0.5 + 0.1,
            animation: `float-particle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) translateX(50px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
