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

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-12 font-jakarta">

      {/* HEADER */}
      <div className="flex flex-col gap-3 text-center">

        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Church Parishes", "ഇടവകകൾ")}
        </span>

        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {t("Parishes & Church Map", "ഇടവകകളും ഭൂപടവും")}
        </h1>

        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {t(
            "Explore the parishes and historical churches of the Malabar Independent Syrian Church through an interactive map.",
            "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ ഇടവകകളും ചരിത്ര ദേവാലയങ്ങളും ഇവിടെ ഭൂപട സഹായത്തോടെ കാണാം."
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

          {/* LEFT MAP PANEL */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            <div className="p-6 rounded-xl bg-surface border border-gold-primary/10 shadow-2xl text-center">

              <h3 className="font-cinzel text-xs font-bold text-gold-primary uppercase tracking-widest mb-4">
                {t("Church Regions Map", "സഭാ മേഖല ഭൂപടം")}
              </h3>

              {/* MAP MOCK */}
              <div className="relative aspect-square w-full max-w-[280px] mx-auto border border-gold-primary/10 bg-background/50 rounded-lg p-4 flex items-center justify-center">

                <svg viewBox="0 0 100 100" className="w-full h-full text-gold-primary/10" fill="currentColor">
                  <path d="M10,20 Q30,10 50,20 T90,30 T80,70 T40,90 T10,60 Z" />
                </svg>

                {parishes.map((p) => {
                  const isSelected = selectedParish?.id === p.id;

                  const cx = "50%";
                  const cy = "50%";

                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParish(p)}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: cx, top: cy }}
                    >
                      <span
                        className={`block w-2.5 h-2.5 rounded-full ${
                          isSelected ? "bg-gold-primary" : "bg-gold-dark"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-mutedText mt-4">
                <Info size={12} className="text-gold-primary" />
                {t(
                  "Click a point to view parish details",
                  "വിവരങ്ങൾ കാണാൻ പോയിന്റിൽ ക്ലിക്ക് ചെയ്യുക"
                )}
              </div>

            </div>

            {/* LIST */}
            <div className="flex flex-col gap-2.5">

              {parishes.map((p) => {
                const isSelected = selectedParish?.id === p.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedParish(p)}
                    className={`p-4 rounded-lg border text-left ${
                      isSelected
                        ? "border-gold-primary bg-gold-primary/5"
                        : "border-gold-primary/10 bg-surface"
                    }`}
                  >
                    <div className="font-cinzel text-xs text-parchment">
                      {isMl ? p.nameMalayalam : p.name}
                    </div>

                    <div className="text-[10px] text-gold-primary mt-1">
                      {t("Established:", "സ്ഥാപിതം:")} {p.established}
                    </div>
                  </button>
                );
              })}

            </div>
          </div>

          {/* RIGHT DETAILS */}
          {selectedParish && (
            <div className="lg:col-span-3 flex flex-col gap-6 bg-surface p-8 rounded-xl border border-gold-primary/10">

              {/* TITLE */}
              <div className="border-b border-gold-primary/10 pb-4">
                <h2 className="font-cinzel text-2xl md:text-3xl text-gold-primary">
                  {isMl
                    ? selectedParish.nameMalayalam
                    : selectedParish.name}
                </h2>
              </div>

              {/* INFO */}
              <div className="grid md:grid-cols-2 gap-4">

                <div className="flex gap-3">
                  <User className="text-gold-primary" />
                  <div>
                    <p className="text-xs text-gold-primary uppercase">
                      {t("Vicar", "വികാരി")}
                    </p>
                    <p>{isMl ? selectedParish.vicarMalayalam : selectedParish.vicar}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="text-gold-primary" />
                  <div>
                    <p className="text-xs text-gold-primary uppercase">
                      {t("Contact", "സമ്പർക്കം")}
                    </p>
                    <p>{selectedParish.contact}</p>
                  </div>
                </div>

              </div>

              {/* HISTORY */}
              <div>
                <h4 className="font-cinzel text-xs text-gold-primary uppercase mb-2">
                  {t("History", "ചരിത്രം")}
                </h4>

                <p className="text-sm text-mutedText leading-relaxed">
                  {isMl
                    ? selectedParish.historyMalayalam
                    : selectedParish.history}
                </p>
              </div>

              {/* MAP */}
              <div className="border-t border-gold-primary/10 pt-4">
                <h4 className="font-cinzel text-xs text-gold-primary uppercase mb-3 flex items-center gap-2">
                  <Navigation size={14} />
                  {t("Location", "സ്ഥാനം")}
                </h4>

                {selectedParish.mapsUrl ? (
                  <iframe
                    src={selectedParish.mapsUrl}
                    className="w-full h-56 rounded-lg border border-gold-primary/20"
                    loading="lazy"
                  />
                ) : (
                  <p className="text-xs text-mutedText">
                    {t("No map available", "ഭൂപടം ലഭ്യമല്ല")}
                  </p>
                )}
              </div>

            </div>
          )}
        </div>

      ) : (
        <div className="text-center py-20 text-mutedText">
          {t(
            "No parishes found in database.",
            "ഡാറ്റാബേസിൽ ഇടവകകൾ ലഭ്യമല്ല."
          )}
        </div>
      )}
    </div>
  );
}