import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, MapPin, Phone, Calendar, User, Navigation, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

async function getParish(id: string) {
  try {
    return await prisma.parish.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}

// Generate dynamic SEO metadata for the parish
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const parish = await getParish(params.id);

  if (!parish) {
    return {
      title: "Parish Not Found | Nuhro Thozhiyoor",
    };
  }

  const title = `${parish.name} | Thozhiyoor Parishes`;
  const description = `Established in ${parish.established}. Vicar: ${parish.vicar}. ${parish.address}. Learn about the historical background and geographical location of ${parish.name}.`;
  const imageUrl = parish.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: parish.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ParishDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const parish = await getParish(params.id);

  if (!parish) {
    notFound();
  }

  // Helper to resolve embeddable Google Maps URLs
  const getEmbedUrl = (url?: string | null) => {
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

  const embedUrl = getEmbedUrl(parish.mapsUrl);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-parchment font-jakarta animate-fade-in">
      {/* Back button */}
      <Link
        href="/parishes"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-6 transition-colors"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ പോവുക" : "Back to Parishes Map"}
      </Link>

      <article className="relative rounded-2xl bg-surface border border-gold-primary/10 overflow-hidden shadow-2xl manuscript-border mb-12 p-6 sm:p-10 flex flex-col gap-6">
        
        {/* Title */}
        <div className="border-b border-gold-primary/10 pb-4">
          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-primary leading-tight">
            {isMl ? parish.nameMalayalam : parish.name}
          </h1>
          <p className="text-[10px] text-gold-primary/70 uppercase font-mono tracking-widest mt-1">
            {isMl ? `സ്ഥാപിതം: ${parish.established}` : `Established: ${parish.established}`}
          </p>
        </div>

        {/* Banner image */}
        {parish.imageUrl && (
          <div className="w-full h-64 rounded-lg overflow-hidden border border-gold-primary/10 bg-background shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={parish.imageUrl}
              alt={isMl ? parish.nameMalayalam : parish.name}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        )}

        {/* ShareButtons */}
        <ShareButtons
          title={isMl ? parish.nameMalayalam : parish.name}
          path={`/parishes/${parish.id}`}
        />

        {/* Stats info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/30 p-5 rounded-lg border border-gold-primary/5">
          <div className="flex gap-3 items-center">
            <User className="text-gold-primary" size={20} />
            <div>
              <p className="text-[9px] uppercase font-bold text-gold-primary/70">
                {isMl ? "വികാരി" : "Vicar in Charge"}
              </p>
              <p className="text-sm font-semibold">{isMl ? parish.vicarMalayalam : parish.vicar}</p>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Phone className="text-gold-primary" size={20} />
            <div>
              <p className="text-[9px] uppercase font-bold text-gold-primary/70">
                {isMl ? "സമ്പർക്കം" : "Contact Number"}
              </p>
              <p className="text-sm font-semibold">{parish.contact}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-3 px-1">
          <MapPin className="text-gold-primary flex-shrink-0" size={20} />
          <div>
            <p className="text-[9px] uppercase font-bold text-gold-primary/70">
              {isMl ? "വിലാസം" : "Parish Address"}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-mutedText mt-0.5 font-sans">
              {isMl ? parish.addressMalayalam : parish.address}
            </p>
          </div>
        </div>

        {/* History */}
        <div className="border-t border-gold-primary/10 pt-6">
          <h3 className="font-cinzel text-sm text-gold-primary uppercase tracking-wider mb-3 font-bold">
            {isMl ? "ഇടവകയുടെ ചരിത്ര പശ്ചാത്തലം" : "Parish History & Legacy"}
          </h3>
          <p className="text-sm sm:text-base text-mutedText leading-relaxed font-cormorant text-xl">
            {isMl ? parish.historyMalayalam : parish.history}
          </p>
        </div>

        {/* Maps Embed */}
        <div className="border-t border-gold-primary/10 pt-6 flex flex-col gap-4">
          <h3 className="font-cinzel text-sm text-gold-primary uppercase tracking-wider font-bold flex items-center gap-2">
            <Navigation size={16} className="text-gold-primary animate-float" />
            {isMl ? "ഭൂപട സ്ഥാനം" : "Google Map Directions"}
          </h3>

          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-64 rounded-lg border border-gold-primary/20 shadow-md bg-background/50"
              loading="lazy"
              title={parish.name}
            />
          ) : (
            <p className="text-xs text-mutedText italic">
              {isMl ? "ഭൂപടസ്ഥാനം ലഭ്യമാക്കിയിട്ടില്ല." : "No interactive map location defined."}
            </p>
          )}

          {parish.mapsUrl && (
            <a
              href={parish.mapsUrl.includes("<iframe") ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parish.name)}` : parish.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-gold-primary/30 rounded-md hover:bg-gold-primary/15 text-gold-primary text-xs font-bold uppercase tracking-wider transition-all mt-1 w-fit shadow-sm bg-background/50"
            >
              <ExternalLink size={12} />
              {isMl ? "ഗൂഗിൾ മാപ്സിൽ തുറക്കുക" : "Open in Google Maps App"}
            </a>
          )}
        </div>

      </article>
    </div>
  );
}
