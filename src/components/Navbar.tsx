"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, Globe } from "lucide-react";
import DynamicLogo from "./DynamicLogo";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/", label: t("Home", "പൂമുഖം") },
    { href: "/about", label: t("About", "ചരിത്രം") },
    { href: "/metropolitans", label: t("Metropolitans", "മെത്രാപ്പോലീത്തമാർ") },
    { href: "/parishes", label: t("Parishes", "ഇടവകകൾ") },
    { href: "/archive", label: t("Archive", "രേഖകൾ") },
    { href: "/timeline", label: t("Timeline", "നാൾവഴി") },
    { href: "/gallery", label: t("Gallery", "കാഴ്ചബംഗ്ലാവ്") },
    { href: "/contact", label: t("Contact", "സമ്പർക്കം") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-background/95 backdrop-blur-md border-b border-gold-primary/10 py-3 shadow-gold-glow"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <DynamicLogo />

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-medium text-[11px] tracking-widest uppercase transition-colors duration-300 ${
                  isActive
                    ? "text-gold-primary font-semibold"
                    : "text-mutedText hover:text-gold-light"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-[-6px] left-0 w-full h-[1.5px] bg-gold-primary" />
                )}
              </Link>
            );
          })}

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-gold-primary/30 text-[10px] font-semibold tracking-wider text-gold-primary hover:bg-gold-primary/10 transition-colors"
            title="Switch Language"
          >
            <Globe size={11} />
            <span>{language === "en" ? "മലയാളം" : "EN"}</span>
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-primary/30 text-[10px] font-semibold uppercase tracking-wider text-gold-primary hover:bg-gold-primary/10 transition-colors"
          >
            <Shield size={11} />
            {t("Admin", "അഡ്മിൻ")}
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Mobile Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded border border-gold-primary/30 text-[9px] font-semibold text-gold-primary"
          >
            <Globe size={10} />
            <span>{language === "en" ? "ML" : "EN"}</span>
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gold-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-[68px] left-0 w-full bg-background border-b border-gold-primary/20 flex flex-col px-6 py-6 gap-5 shadow-2xl glass-panel animate-fade-in">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-cinzel tracking-wider border-b border-gold-primary/5 pb-2 ${
                  isActive ? "text-gold-primary font-bold" : "text-mutedText"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/admin"
            className="flex items-center justify-center gap-2 py-2.5 mt-2 rounded-lg bg-gold-primary/10 border border-gold-primary/30 text-xs font-semibold uppercase text-gold-primary"
          >
            <Shield size={12} />
            {t("Admin Dashboard", "അഡ്മിൻ ഡാഷ്‌ബോർഡ്")}
          </Link>
        </div>
      )}
    </nav>
  );
}
