"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
} from "lucide-react";
import DynamicLogo from "./DynamicLogo";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-surface border-t border-gold-primary/10 pt-16 pb-8 z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-gold-primary/5">
          {/* Logo + About */}
          <div className="flex flex-col gap-4">
            <DynamicLogo />

            <p className="text-mutedText text-xs md:text-sm max-w-sm leading-relaxed">
              {t(
                "An independent, digital heritage archive dedicated to documenting the history, manuscripts, traditions, and ecclesial legacy of the Malabar Independent Syrian Church – Thozhiyoor.",
                "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ (തൊഴിയൂർ സഭ) ചരിത്രം, കൈയെഴുത്തുപ്രതികൾ, പാരമ്പര്യങ്ങൾ, ആത്മീയ പൈതൃകം എന്നിവ സംരക്ഷിക്കുന്നതിനായി പ്രവർത്തിക്കുന്ന ഒരു സ്വതന്ത്ര ഡിജിറ്റൽ ആർക്കൈവ്."
              )}
            </p>
          </div>

          {/* Archives */}
          <div className="flex flex-col gap-4">
            <h4 className="font-cinzel text-sm text-gold-primary font-semibold tracking-wider">
              {t("Archives & Research", "ഗവേഷണ ശേഖരം")}
            </h4>

            <div className="flex flex-col gap-2.5 text-xs md:text-sm text-mutedText">
              <Link
                href="/archive?category=History"
                className="hover:text-gold-light transition-colors"
              >
                {t("Episcopal History", "എപ്പിസ്കോപ്പൽ ചരിത്രം")}
              </Link>

              <Link
                href="/archive?category=Manuscripts"
                className="hover:text-gold-light transition-colors"
              >
                {t("Ancient Manuscripts", "പുരാതന കൈയെഴുത്തുപ്രതികൾ")}
              </Link>

              <Link
                href="/archive?category=Theology"
                className="hover:text-gold-light transition-colors"
              >
                {t("Syriac Liturgy & Theology", "സുറിയാനി ആരാധനക്രമം")}
              </Link>

              <Link
                href="/timeline"
                className="hover:text-gold-light transition-colors"
              >
                {t("Historical Timeline", "ചരിത്ര നാൾവഴി")}
              </Link>
            </div>
          </div>

          {/* Socials + Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-cinzel text-sm text-gold-primary font-semibold tracking-wider">
              {t("Connect & Inquiries", "സമ്പർക്കങ്ങൾ")}
            </h4>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/nuhrothozhiyoor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gold-primary/25 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-background transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>

              <a
                href="https://facebook.com/nuhrothozhiyoor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gold-primary/25 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-background transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>

              <a
                href="https://x.com/nuhrothozhiyoor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gold-primary/25 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-background transition-all duration-300"
                aria-label="X"
              >
                <Twitter size={14} />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@nuhrothozhiyoor"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gold-primary/25 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-background transition-all duration-300"
                aria-label="YouTube"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.12C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.386.566a2.997 2.997 0 0 0-2.112 2.12A31.27 31.27 0 0 0 0 12a31.27 31.27 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.112 2.12C4.495 20.5 12 20.5 12 20.5s7.505 0 9.386-.566a2.997 2.997 0 0 0 2.112-2.12A31.27 31.27 0 0 0 24 12a31.27 31.27 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>

              <a
                href="mailto:nuhrothozhiyoor@gmail.com"
                className="w-8 h-8 rounded-full border border-gold-primary/25 flex items-center justify-center text-gold-primary hover:bg-gold-primary hover:text-background transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
            </div>

            {/* Disclaimer */}
            <div className="text-[10px] text-mutedText bg-background/40 border border-gold-primary/5 p-3 rounded-xl leading-relaxed backdrop-blur-sm">
              <span className="text-gold-primary font-medium block mb-1">
                {t("Disclaimer", "പ്രഖ്യാപനം")}
              </span>

              {t(
                "This is not the official website of the Malabar Independent Syrian Church. It is a non-official, independent research and archive initiative.",
                "ഇത് മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ ഔദ്യോഗിക വെബ്‌സൈറ്റ് അല്ല. ഇത് ഒരു സ്വതന്ത്ര ഗവേഷണ പദ്ധതിയാണ്."
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 pt-8 text-[11px] text-mutedText">
          {/* Copyright */}
          <div className="text-center lg:text-left">
            &copy; {new Date().getFullYear()} Nuhro Thozhiyoor.{" "}
            {t(
              "All Rights Reserved.",
              "എല്ലാ അവകാശങ്ങളും സംരക്ഷിക്കപ്പെട്ടിരിക്കുന്നു."
            )}
          </div>

          {/* Crafted By */}
<Link
  href="https://ledlro.io"
  target="_blank"
  rel="noreferrer"
  className="group flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-300"
>
  <span className="text-[10px] uppercase tracking-[0.22em] text-mutedText/70 mb-1">
    {t("Crafted with", "സ്നേഹത്തോടെ നിർമ്മിച്ചത്")}
    <span className="mx-1 text-red-400 not-italic">♥</span>
    {t("by", "")}
  </span>

  <div className="relative flex items-end">
    {/* subtle gold glow */}
    <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition duration-500 bg-gold-primary rounded-full" />

    <span className="relative font-cinzel text-[22px] md:text-[24px] font-semibold tracking-[0.08em] text-gold-primary group-hover:text-gold-light transition-colors duration-300">
      LEDLRO
    </span>

    <span className="relative text-[13px] font-medium text-gold-primary/70 ml-[2px] mb-[3px] group-hover:text-gold-primary transition-colors">
      .io
    </span>
  </div>

  <span className="mt-1 h-px w-0 bg-gold-primary/30 group-hover:w-full transition-all duration-500" />
</Link>

          {/* Back To Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gold-primary hover:text-gold-light uppercase text-[9px] font-bold tracking-wider transition-colors"
          >
            Back to top <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}