"use client";

import React, { useState, useEffect } from "react";
import { Share2, Link as LinkIcon, Send, Facebook, Twitter, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

interface ShareButtonsProps {
  title: string;
  slug?: string;
  path?: string; // fallback if no slug
}

export default function ShareButtons({ title, slug, path }: ShareButtonsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Generate full URL on mount
    const origin = window.location.origin;
    if (slug) {
      setShareUrl(`${origin}/posts/${slug}`);
    } else if (path) {
      setShareUrl(`${origin}${path}`);
    } else {
      setShareUrl(window.location.href);
    }
  }, [slug, path]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-t border-b border-gold-primary/10 w-full select-none">
      <span className="text-xs font-semibold uppercase tracking-wider text-gold-primary flex items-center gap-1.5 mr-2">
        <Share2 size={14} />
        {t("Share Archive", "പങ്കുവെക്കുക")}
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1.5 rounded bg-green-950/20 border border-green-500/20 text-green-400 hover:bg-green-950/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
      >
        <Send size={12} /> WhatsApp
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1.5 rounded bg-blue-950/20 border border-blue-500/20 text-blue-400 hover:bg-blue-950/40 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
      >
        <Facebook size={12} /> Facebook
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 hover:bg-neutral-850 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
      >
        <Twitter size={12} /> X
      </a>

      {/* Clipboard Copy */}
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded bg-gold-primary/5 border border-gold-primary/20 text-gold-primary hover:bg-gold-primary/15 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ml-auto"
      >
        {copied ? (
          <>
            <Check size={12} className="text-green-400" />
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
