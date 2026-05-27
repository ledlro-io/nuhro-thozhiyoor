"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Eye, X, Archive } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import ShareButtons from "@/components/ShareButtons";
import Separator from "@/components/Separator";

interface GalleryImage {
  id: string;
  title: string;
  titleMalayalam: string;
  description: string;
  descriptionMalayalam: string;
  imageUrl: string;
  category: string;
}

export default function GalleryPage() {
  const { language, t } = useLanguage();
  const isMl = language === "ml";

  const categories = [
    t("All", "എല്ലാം"),
    "Manuscripts",
    "Cathedrals",
    "Historical Portraits",
  ];

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      const url =
        selectedCategory === "All" || selectedCategory === "എല്ലാം"
          ? "/api/gallery"
          : `/api/gallery?category=${selectedCategory}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-10 font-jakarta">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Ecclesial Museum", "സഭാ കാഴ്ചബംഗ്ലാവ്")}
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {t("Digital Heritage Gallery", "ചിത്രശാല")}
        </h1>
        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {t(
            "Explore historical archives, ancient palm-leaf manuscripts, icons, and sanctuaries preserved digitally for studies.",
            "പുരാതന താലിയോലകൾ, കത്തീഡ്രൽ അൾത്താരകൾ, ചരിത്ര സ്മാരകങ്ങൾ എന്നിവയുടെ ഡിജിറ്റൽ ചിത്രശാല ഇവിടെ കാണാം."
          )}
        </p>
        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      {/* Category Selectors */}
      <div className="flex flex-wrap gap-2.5 justify-center border-b border-gold-primary/5 pb-5 select-none">
        {categories.map((cat) => {
          const apiCatKey = cat === "എല്ലാം" ? "All" : cat;
          const isSelected = selectedCategory === cat || (cat === "All" && selectedCategory === "എല്ലാം") || (cat === "എല്ലാം" && selectedCategory === "All");
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(apiCatKey)}
              className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                isSelected
                  ? "bg-gold-primary text-background shadow-gold-glow"
                  : "bg-surface border border-gold-primary/10 text-mutedText hover:border-gold-primary/25"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <Separator />

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="relative rounded-xl border border-gold-primary/5 bg-surface overflow-hidden shadow-lg aspect-[4/3] group cursor-pointer hover:border-gold-primary/30 transition-all duration-300"
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.imageUrl}
                alt={isMl ? img.titleMalayalam : img.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-102 transition-all duration-500"
              />

              {/* Gradient tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent opacity-70" />

              {/* Info Text */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1 z-10">
                <span className="text-[9px] uppercase font-bold text-gold-primary tracking-widest">{img.category}</span>
                <h3 className="font-cinzel text-base font-bold text-parchment leading-tight">
                  {isMl ? img.titleMalayalam : img.title}
                </h3>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-gold-primary/20 backdrop-blur-sm border border-gold-primary/45 flex items-center justify-center text-gold-primary">
                  <Eye size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gold-primary/10 rounded-xl bg-surface/30 max-w-md mx-auto p-6">
          <p className="text-mutedText text-xs">No heritage images found in this category.</p>
        </div>
      )}

      {/* Modal Dialog */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-background/90 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] rounded-xl border border-gold-primary/25 bg-surface overflow-hidden shadow-2xl flex flex-col md:flex-row glass-panel animate-scale-up">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-background/80 border border-gold-primary/30 text-gold-primary hover:bg-gold-primary hover:text-background transition-all"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Left Image */}
            <div className="w-full md:w-3/5 bg-background flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-gold-primary/10 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.imageUrl}
                alt={isMl ? selectedImage.titleMalayalam : selectedImage.title}
                className="w-full h-full object-cover max-h-[45vh] md:max-h-[80vh]"
              />
            </div>

            {/* Right Information */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto gap-6 bg-surface">
              <div className="flex flex-col gap-4">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-[9px] font-bold uppercase tracking-widest text-gold-primary w-fit">
                  {selectedImage.category}
                </span>
                
                <h2 className="font-cinzel text-lg md:text-xl font-bold text-gold-primary leading-tight">
                  {isMl ? selectedImage.titleMalayalam : selectedImage.title}
                </h2>
                
                <div className="w-8 h-[1px] bg-gold-primary/30" />

                <p className="text-mutedText text-xs md:text-sm leading-relaxed font-cormorant text-lg mt-2 whitespace-pre-line">
                  {isMl ? selectedImage.descriptionMalayalam : selectedImage.description}
                </p>
              </div>

              {/* Share and Footer */}
              <div className="flex flex-col gap-4">
                <ShareButtons
                  title={isMl ? selectedImage.titleMalayalam : selectedImage.title}
                  path={`/gallery?image=${selectedImage.id}`}
                />
                
                <div className="flex items-center gap-1.5 text-[10px] text-mutedText/85">
                  <Archive size={12} className="text-gold-primary" /> preserve of Thozhiyur See
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
