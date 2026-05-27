"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { MapPin, Phone, Calendar, User, Navigation, Info } from "lucide-react";
import Separator from "@/components/Separator";

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
            setSelectedParish(data[0]); // default select the first one
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
      {/* Page Header */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Ecclesial Jurisdictions", "സഭാ ഭദ്രാസനങ്ങൾ")}
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {t("Parishes & Diocesan Map", "ഇടവകകളും ഭൂപടവും")}
        </h1>
        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {t(
            "Explore the parishes, historical mother churches, and regional chapels of the Malabar Independent Syrian Church, featuring active Google Maps routing.",
            "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ കീഴിലുള്ള ഇടവകകൾ, മാതൃദേവാലയങ്ങൾ, ചാപ്പലുകൾ എന്നിവ ഭൂപട സഹായത്തോടെ ഇവിടെ കണ്ടെത്താം."
          )}
        </p>
        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
        </div>
      ) : parishes.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left / Center 2 cols: Regional Interactive SVG Map */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-xl bg-surface border border-gold-primary/10 shadow-2xl glass-panel text-center">
              <h3 className="font-cinzel text-xs font-bold text-gold-primary uppercase tracking-widest mb-4">
                {t("Thrissur Diocesan Regions", "തൃശൂർ അതിരൂപതാ മേഖലകൾ")}
              </h3>

              {/* SVG Region Map Mockup */}
              <div className="relative aspect-square w-full max-w-[280px] mx-auto border border-gold-primary/10 bg-background/50 rounded-lg p-4 flex items-center justify-center shadow-inner">
                {/* SVG Outline representing Thrissur regional lines */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold-primary/10" fill="currentColor">
                  {/* abstract map lines */}
                  <path d="M10,20 Q30,10 50,20 T90,30 T80,70 T40,90 T10,60 Z" />
                  <path d="M30,30 L50,45 L70,60" stroke="rgba(226, 181, 111, 0.05)" strokeWidth="1" fill="none" />
                  
                  {/* Dynamically draw lines from selected parish to others */}
                  {selectedParish && (
                    <circle
                      cx={selectedParish.name.includes("Cathedral") ? 35 : 55}
                      cy={selectedParish.name.includes("Cathedral") ? 40 : 55}
                      r="12"
                      className="text-gold-primary/5 fill-current animate-ping"
                      style={{ animationDuration: "3s" }}
                    />
                  )}
                </svg>

                {/* Plotting points manually for main seeded parishes */}
                {parishes.map((p) => {
                  const isCathedral = p.name.includes("Cathedral");
                  // Coordinates relative to SVG grid
                  const cx = isCathedral ? "35%" : "55%";
                  const cy = isCathedral ? "40%" : "55%";
                  const isSelected = selectedParish?.id === p.id;

                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParish(p)}
                      className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                      style={{ left: cx, top: cy }}
                    >
                      {/* Ring */}
                      <span
                        className={`absolute -inset-2 rounded-full border transition-all duration-300 ${
                          isSelected
                            ? "border-gold-primary scale-125 bg-gold-primary/10"
                            : "border-gold-primary/20 scale-75 group-hover:scale-100 group-hover:border-gold-primary/50"
                        }`}
                      />
                      {/* Center Dot */}
                      <span
                        className={`block w-2.5 h-2.5 rounded-full shadow-md ${
                          isSelected ? "bg-gold-primary" : "bg-gold-dark group-hover:bg-gold-primary"
                        }`}
                      />

                      {/* Tooltip Label */}
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 rounded bg-surface border border-gold-primary/30 text-[9px] font-bold text-gold-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-35">
                        {isMl ? p.nameMalayalam : p.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-2 items-center justify-center text-[10px] text-mutedText mt-4">
                <Info size={12} className="text-gold-primary" />
                {t("Click dots on the map to query parish details", "വിവരങ്ങൾ അറിയാൻ ഭൂപടത്തിലെ അടയാളങ്ങളിൽ ക്ലിക്ക് ചെയ്യുക")}
              </div>
            </div>

            {/* Parish selection quick-list */}
            <div className="flex flex-col gap-2.5">
              {parishes.map((p) => {
                const isSelected = selectedParish?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedParish(p)}
                    className={`w-full p-4 rounded-lg border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-gold-primary/5 border-gold-primary/45 shadow-gold-glow"
                        : "bg-surface border-gold-primary/5 hover:border-gold-primary/20"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-cinzel text-xs font-semibold text-parchment">
                        {isMl ? p.nameMalayalam : p.name}
                      </span>
                      <span className="text-[10px] text-gold-primary font-mono">
                        {t("Est.", "സ്ഥാപിതം:")} {p.established}
                      </span>
                    </div>
                    <MapPin
                      size={16}
                      className={isSelected ? "text-gold-primary" : "text-mutedText group-hover:text-gold-primary"}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right 3 cols: Detailed Parish Information Panel */}
          {selectedParish && (
            <div className="lg:col-span-3 flex flex-col gap-6 bg-surface p-8 rounded-xl border border-gold-primary/10 shadow-2xl glass-panel manuscript-border animate-fade-in">
              <div className="flex flex-col gap-4 border-b border-gold-primary/10 pb-6">
                <div className="flex flex-wrap items-center gap-3 text-gold-primary text-[10px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {t("Established", "സ്ഥാപിതം")}: {selectedParish.established}
                  </span>
                  <span className="text-mutedText">&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {t("Parish", "ഇടവക")}
                  </span>
                </div>

                <h2 className="font-cinzel text-xl md:text-3xl font-bold text-gold-primary leading-tight">
                  {isMl ? selectedParish.nameMalayalam : selectedParish.name}
                </h2>
              </div>

              {/* Vicar & Contact details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/40 p-5 rounded-lg border border-gold-primary/5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded bg-gold-primary/5 border border-gold-primary/25 flex items-center justify-center text-gold-primary flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-gold-primary tracking-wider">
                      {t("Vicar Name", "വികാരിയുടെ പേര്")}
                    </h4>
                    <p className="text-sm font-semibold text-parchment mt-0.5">
                      {isMl ? selectedParish.vicarMalayalam : selectedParish.vicar}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded bg-gold-primary/5 border border-gold-primary/25 flex items-center justify-center text-gold-primary flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-gold-primary tracking-wider">
                      {t("Contact Details", "സമ്പർക്ക ഫോൺ")}
                    </h4>
                    <p className="text-sm font-semibold text-parchment mt-0.5">
                      {selectedParish.contact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Parish History */}
              <div className="flex flex-col gap-3">
                <h4 className="font-cinzel text-xs font-bold text-gold-primary uppercase tracking-widest">
                  {t("Parish History & Narrative", "ഇടവകയുടെ ചരിത്ര പശ്ചാത്തലം")}
                </h4>
                <p className="text-mutedText text-xs md:text-sm leading-relaxed whitespace-pre-line font-cormorant text-lg">
                  {isMl ? selectedParish.historyMalayalam : selectedParish.history}
                </p>
              </div>

              {/* Location embed or button directions */}
              <div className="flex flex-col gap-4 border-t border-gold-primary/10 pt-6">
                <h4 className="font-cinzel text-xs font-bold text-gold-primary uppercase tracking-widest flex items-center gap-1.5">
                  <Navigation size={13} /> {t("Geographical Location", "ഭൂപട നാവിഗേഷൻ")}
                </h4>
                
                {selectedParish.mapsUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-gold-primary/20 h-56 bg-background shadow-inner">
                    <iframe
                      src={selectedParish.mapsUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                      allowFullScreen={true}
                      loading="lazy"
                      title={`${selectedParish.name} Location Map`}
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center bg-background/50 rounded-lg border border-dashed border-gold-primary/15 text-xs text-mutedText flex flex-col items-center gap-3">
                    <p>No map coordinates or embed iframe registered for this church location.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gold-primary/10 rounded-xl bg-surface/30 max-w-md mx-auto p-6">
          <p className="text-mutedText text-sm">
            No parish records have been created in the database yet. Log into admin dashboard to configure parishes.
          </p>
        </div>
      )}
    </div>
  );
}
