"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import {
  MapPin,
  Phone,
  Calendar,
  User,
  Navigation,
  Info,
  ExternalLink,
} from "lucide-react";

interface Parish {
  id: string;
  name: string;
  nameMalayalam: string;
  established: string;
  vicar: string;
  vicarMalayalam: string;
  contact: string;
  address: string;
  addressMalayalam: string;
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
  history: string;
  historyMalayalam: string;
  imageUrl?: string;
}

export default function ParishesPage() {
  const { language, t } = useLanguage();
  const isMl = language === "ml";

  const [parishes, setParishes] = useState<Parish[]>([]);
  const [selectedParish, setSelectedParish] = useState<Parish | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParishes() {
      try {
        const res = await fetch("/api/parishes");
        if (res.ok) {
          const data = await res.json();
          setParishes(data);

          if (data.length > 0) {
            setSelectedParish(data[0]);
          }
        }
      } catch (err) {
        console.error("Fetch parishes error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchParishes();
  }, []);

  // Helper to resolve embeddable Google Maps URLs
  const getEmbedUrl = (url?: string) => {
    if (!url) return null;
    
    // Case 1: Pasted iframe code
    if (url.includes("<iframe")) {
      const match = url.match(/src="([^"]+)"/);
      if (match && match[1]) return match[1];
    }
    
    // Case 2: Contains coordinates in @lat,lng format
    const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    // Case 3: Simple coordinates like "10.463385,76.015243"
    const simpleCoord = url.match(/^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/);
    if (simpleCoord) {
      return `https://maps.google.com/maps?q=${simpleCoord[1]},${simpleCoord[2]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    
    // Case 4: Google maps search place link
    if (url.includes("google.com/maps/place/")) {
      const placeParts = url.split("place/");
      if (placeParts[1]) {
        const place = placeParts[1].split("/")[0];
        return `https://maps.google.com/maps?q=${place}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
    }

    if (url.startsWith("http")) {
      return url;
    }
    
    // Fallback: search query
    return `https://maps.google.com/maps?q=${encodeURIComponent(url)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  // Geographically map coordinates to SVG space relative to Kunnamkulam diocese region
  const getMapCoords = (lat?: number, lng?: number) => {
    if (!lat || !lng) return { x: 50, y: 50 };
    
    // Regional bounding box
    const minLat = 10.43;
    const maxLat = 10.49;
    const minLng = 75.98;
    const maxLng = 76.07;
    
    const x = 10 + ((lng - minLng) / (maxLng - minLng)) * 80;
    const y = 90 - ((lat - minLat) / (maxLat - minLat)) * 80;
    
    return {
      x: Math.max(5, Math.min(95, x)),
      y: Math.max(5, Math.min(95, y))
    };
  };

  const selectedEmbedUrl = selectedParish ? getEmbedUrl(selectedParish.mapsUrl) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-12 font-jakarta">

      {/* HEADER */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Diocesan Parishes", "ഭദ്രാസന ഇടവകകൾ")}
        </span>

        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {t("Parishes & Diocesan Map", "ഇടവകകളും ഭൂപടവും")}
        </h1>

        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {t(
            "Explore the parishes and historical churches of the Malabar Independent Syrian Church through our interactive regional directory.",
            "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ ഇടവകകളും ചരിത്ര ദേവാലയങ്ങളും ഭൂപടത്തിന്റെ സഹായത്തോടെ കണ്ടെത്തുക."
          )}
        </p>

        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
        </div>
      ) : parishes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* LEFT PANEL: SVG MAP & LIST */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* SVG Interactive Map */}
            <div className="p-6 rounded-xl bg-surface border border-gold-primary/10 shadow-2xl text-center relative overflow-hidden manuscript-border">
              <h3 className="font-cinzel text-xs font-bold text-gold-primary uppercase tracking-widest mb-4">
                {t("Parish Geolocation", "ഇടവകകളുടെ ഭൂപടം")}
              </h3>

              <div className="relative aspect-square w-full max-w-[280px] mx-auto border border-gold-primary/10 bg-background/50 rounded-lg p-2 flex items-center justify-center shadow-inner">
                {/* Decorative Map Grid Lines */}
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-gold-primary/5 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="0.2">
                  <line x1="20" y1="0" x2="20" y2="100" />
                  <line x1="40" y1="0" x2="40" y2="100" />
                  <line x1="60" y1="0" x2="60" y2="100" />
                  <line x1="80" y1="0" x2="80" y2="100" />
                  <line x1="0" y1="20" x2="100" y2="20" />
                  <line x1="0" y1="40" x2="100" y2="40" />
                  <line x1="0" y1="60" x2="100" y2="60" />
                  <line x1="0" y1="80" x2="100" y2="80" />
                </svg>

                {/* Stylized Regional Highways Representation */}
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-gold-primary/10 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="0.6">
                  {/* Road from West to East (Thozhiyur to Kunnamkulam area) */}
                  <path d="M5,45 Q35,40 60,45 T95,50" />
                  {/* North-South road */}
                  <path d="M45,5 Q48,50 50,95" />
                </svg>

                {/* Parish Points */}
                {parishes.map((p) => {
                  const isSelected = selectedParish?.id === p.id;
                  const coords = getMapCoords(p.latitude, p.longitude);

                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParish(p)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group/point transition-all duration-300 z-10"
                      style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                      title={isMl ? p.nameMalayalam : p.name}
                    >
                      <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                        {isSelected && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-primary opacity-75"></span>
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 shadow-gold-glow transition-all duration-300 ${
                            isSelected
                              ? "bg-gold-primary scale-125"
                              : "bg-gold-dark hover:bg-gold-primary hover:scale-110"
                          }`}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-mutedText mt-4">
                <Info size={12} className="text-gold-primary" />
                {t(
                  "Interactive coordinates projected from live database",
                  "തത്സമയ കോർഡിനേറ്റുകൾ അടിസ്ഥാനമാക്കിയുള്ള ഭൂപടം"
                )}
              </div>
            </div>

            {/* List Selection */}
            <div className="flex flex-col gap-2.5">
              {parishes.map((p) => {
                const isSelected = selectedParish?.id === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedParish(p)}
                    className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                      isSelected
                        ? "border-gold-primary bg-gold-primary/5 shadow-md"
                        : "border-gold-primary/10 bg-surface hover:bg-cardElevated"
                    }`}
                  >
                    <div className="font-cinzel text-xs font-bold text-parchment group-hover:text-gold-primary">
                      {isMl ? p.nameMalayalam : p.name}
                    </div>

                    <div className="text-[10px] text-gold-primary/80 mt-1">
                      {t("Established:", "സ്ഥാപിതം:")} {p.established}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL: SELECTED DETAILS & LIVE GOOGLE MAPS EMBED */}
          {selectedParish && (
            <div className="lg:col-span-3 flex flex-col gap-6 bg-surface p-8 rounded-xl border border-gold-primary/10 shadow-2xl manuscript-border">

              {/* Title & Image banner */}
              <div className="border-b border-gold-primary/10 pb-4">
                <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-primary leading-tight">
                  {isMl ? selectedParish.nameMalayalam : selectedParish.name}
                </h2>
              </div>

              {selectedParish.imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden border border-gold-primary/10 bg-background shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedParish.imageUrl}
                    alt={isMl ? selectedParish.nameMalayalam : selectedParish.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              )}

              {/* Vicar & Contact stats */}
              <div className="grid md:grid-cols-2 gap-5 bg-background/30 p-4 rounded-lg border border-gold-primary/5">
                <div className="flex gap-3 items-center">
                  <User className="text-gold-primary" size={18} />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-gold-primary/70">
                      {t("Vicar", "വികാരി")}
                    </p>
                    <p className="text-xs font-semibold">{isMl ? selectedParish.vicarMalayalam : selectedParish.vicar}</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Phone className="text-gold-primary" size={18} />
                  <div>
                    <p className="text-[9px] uppercase font-bold text-gold-primary/70">
                      {t("Contact", "സമ്പർക്കം")}
                    </p>
                    <p className="text-xs font-semibold">{selectedParish.contact}</p>
                  </div>
                </div>
              </div>

              {/* Address details */}
              <div className="flex gap-3">
                <MapPin className="text-gold-primary flex-shrink-0" size={18} />
                <div>
                  <p className="text-[9px] uppercase font-bold text-gold-primary/70">
                    {t("Parish Address", "വിലാസം")}
                  </p>
                  <p className="text-xs leading-normal mt-0.5 text-mutedText">
                    {isMl ? selectedParish.addressMalayalam : selectedParish.address}
                  </p>
                </div>
              </div>

              {/* History */}
              <div className="border-t border-gold-primary/10 pt-4">
                <h4 className="font-cinzel text-xs text-gold-primary uppercase tracking-wider mb-2 font-bold">
                  {t("Parish History & Narrative", "ഇടവക ചരിത്രം")}
                </h4>
                <p className="text-xs md:text-sm text-mutedText leading-relaxed font-cormorant text-base">
                  {isMl ? selectedParish.historyMalayalam : selectedParish.history}
                </p>
              </div>

              {/* Google Map Link Embed & Action Redirect */}
              <div className="border-t border-gold-primary/10 pt-4 flex flex-col gap-3">
                <h4 className="font-cinzel text-xs text-gold-primary uppercase tracking-wider mb-1 font-bold flex items-center gap-2">
                  <Navigation size={14} className="text-gold-primary animate-float" />
                  {t("Interactive Google Map Location", "ഭൂപട സ്ഥാനം")}
                </h4>

                {selectedEmbedUrl ? (
                  <iframe
                    src={selectedEmbedUrl}
                    className="w-full h-56 rounded-lg border border-gold-primary/20 shadow-md"
                    loading="lazy"
                    title={selectedParish.name}
                  />
                ) : (
                  <p className="text-xs text-mutedText italic">
                    {t("No interactive map location defined.", "ഭൂപടസ്ഥാനം രേഖപ്പെടുത്തിയിട്ടില്ല.")}
                  </p>
                )}

                {selectedParish.mapsUrl && (
                  <a
                    href={selectedParish.mapsUrl.includes("<iframe") ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedParish.name)}` : selectedParish.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gold-primary/30 rounded-md hover:bg-gold-primary/15 text-gold-primary text-[10px] font-bold uppercase tracking-wider transition-all mt-1 w-fit shadow-sm bg-background/50"
                  >
                    <ExternalLink size={12} />
                    {t("Directions / Open in Google Maps", "ഗൂഗിൾ മാപ്സിൽ തുറക്കുക")}
                  </a>
                )}
              </div>

            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 text-mutedText border border-dashed border-gold-primary/20 rounded-xl max-w-lg mx-auto bg-surface/50 p-6">
          {t(
            "No parishes found in database.",
            "ഡാറ്റാബേസിൽ ഇടവകകൾ ലഭ്യമായിട്ടില്ല."
          )}
        </div>
      )}
    </div>
  );
}