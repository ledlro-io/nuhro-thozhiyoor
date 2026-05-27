import React from "react";

export default function Separator() {
  return (
    <div className="flex items-center justify-center w-full my-12 pointer-events-none select-none">
      <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent to-gold-primary/30" />
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold-primary/80 mx-4 animate-float"
        style={{ animationDuration: "8s" }}
      >
        <circle cx="12" cy="12" r="1.5" fill="#e2b56f" />
        {/* Vertical stem */}
        <path d="M12 4v16" />
        {/* Horizontal beam */}
        <path d="M4 12h16" />
        {/* Buds */}
        <circle cx="12" cy="3" r="0.5" fill="#e2b56f" />
        <circle cx="12" cy="21" r="0.5" fill="#e2b56f" />
        <circle cx="3" cy="12" r="0.5" fill="#e2b56f" />
        <circle cx="21" cy="12" r="0.5" fill="#e2b56f" />
      </svg>
      <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent to-gold-primary/30" />
    </div>
  );
}
