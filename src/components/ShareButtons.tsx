"use client";

import React, { useState, useEffect } from "react";
import {
  Share2,
  Link as LinkIcon,
  Send,
  Facebook,
  Twitter,
  Check,
} from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface ShareButtonsProps {
  title: string;
  slug?: string;
  path?: string;
}

export default function ShareButtons({
  title,
  slug,
  path,
}: ShareButtonsProps) {
  const { t } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [instaCopied, setInstaCopied] = useState(false);
  const [showInstaTooltip, setShowInstaTooltip] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    const origin = window.location.origin;

    if (slug) {
      setShareUrl(`${origin}/posts/${slug}`);
    } else if (path) {
      setShareUrl(`${origin}${path}`);
    } else {
      setShareUrl(window.location.href);
    }

    setCanNativeShare(!!navigator.share);
  }, [slug, path]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleInstagramCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setInstaCopied(true);
      setShowInstaTooltip(true);

      setTimeout(() => {
        setInstaCopied(false);
        setShowInstaTooltip(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        url: shareUrl,
      });
    } catch (err) {
      // User cancelled — ignore
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-t border-b border-gold-primary/10 w-full select-none">
      {/* Label */}
      <span className="text-xs font-semibold uppercase tracking-wider text-gold-primary flex items-center gap-1.5 mr-2">
        <Share2 size={14} />
        {t("Share Archive", "പങ്കുവെക്കുക")}
      </span>

      {/* Native Share — Mobile only */}
      {canNativeShare && (
        <button
          onClick={handleNativeShare}
          className="px-3 py-1.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-gold-primary hover:bg-gold-primary/20 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors md:hidden"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>

          {t("Share", "ഷെയർ")}
        </button>
      )}

      {/* Desktop Buttons */}
      <div
        className={`flex flex-wrap gap-3 ${
          canNativeShare ? "hidden md:flex" : "flex"
        }`}
      >
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded bg-green-950/20 border border-green-500/20 text-green-400 hover:bg-green-950/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Send size={12} />
          WhatsApp
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded bg-blue-950/20 border border-blue-500/20 text-blue-400 hover:bg-blue-950/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Facebook size={12} />
          Facebook
        </a>

        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Twitter size={12} />
          X
        </a>

        {/* Instagram Story */}
        <div className="relative">
          <button
            onClick={handleInstagramCopy}
            className="px-3 py-1.5 rounded bg-pink-950/20 border border-pink-500/20 text-pink-400 hover:bg-pink-950/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            {instaCopied ? (
              <>
                <Check size={12} className="text-green-400" />
                {t("Copied!", "കോപ്പി ചെയ്തു!")}
              </>
            ) : (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
                </svg>

                {t("Instagram Story", "ഇൻസ്റ്റ Story")}
              </>
            )}
          </button>

          {/* Tooltip */}
          {showInstaTooltip && (
            <div className="absolute bottom-full left-0 mb-2 w-56 p-2.5 rounded bg-surface border border-pink-500/20 text-[10px] text-mutedText leading-relaxed shadow-xl z-50">
              <span className="text-pink-400 font-bold block mb-1">
                {t(
                  "How to share on Instagram:",
                  "Instagram-ൽ ഷെയർ ചെയ്യാൻ:"
                )}
              </span>

              {t(
                "Link copied! Open Instagram → Create Story → tap the link sticker → paste the link.",
                "ലിങ്ക് കോപ്പി ചെയ്തു! Instagram തുറക്കുക → Story ക്രിയേറ്റ് ചെയ്യുക → Link Sticker → ലിങ്ക് പേസ്റ്റ് ചെയ്യുക."
              )}

              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-pink-500/20" />
            </div>
          )}
        </div>
      </div>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`px-3 py-1.5 rounded border text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ml-auto ${
          copied
            ? "bg-green-950/20 border-green-500/20 text-green-400"
            : "bg-gold-primary/5 border-gold-primary/20 text-gold-primary hover:bg-gold-primary/15"
        }`}
      >
        {copied ? (
          <>
            <Check size={12} />
            {t("Copied!", "പകർത്തി!")}
          </>
        ) : (
          <>
            <LinkIcon size={12} />
            {t("Copy Link", "ലിങ്ക് പകർപ്പ്")}
          </>
        )}
      </button>
    </div>
  );
}