import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Calendar, ArrowRight, Newspaper, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Announcements | Nuhro Thozhiyoor",
  description: "Official pastoral updates, feast announcements, episcopal messages, and community events from the historic Malabar Independent Syrian Church, Thozhiyoor.",
  alternates: {
    canonical: "https://nuhro-thozhiyoor.vercel.app/news",
  },
  openGraph: {
    title: "News & Events | Nuhro Thozhiyoor",
    description: "Official pastoral updates, feast announcements, episcopal messages, and community events from the historic Malabar Independent Syrian Church, Thozhiyoor.",
    type: "website",
    url: "https://nuhro-thozhiyoor.vercel.app/news",
    siteName: "Nuhro Thozhiyoor",
    images: [
      {
        url: "https://nuhro-thozhiyoor.vercel.app/logo.jpg",
        width: 800,
        height: 600,
        alt: "Nuhro Thozhiyoor News",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "News & Events | Nuhro Thozhiyoor",
    description: "Official announcements and episcopal statements from the See of Thozhiyoor.",
    images: ["https://nuhro-thozhiyoor.vercel.app/logo.jpg"],
  },
};

async function getNews() {
  try {
    return await prisma.news.findMany({
      orderBy: { date: "desc" },
    });
  } catch (error) {
    console.error("Fetch news error:", error);
    return [];
  }
}

export default async function NewsListPage() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const newsList = await getNews();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Nuhro Thozhiyoor Diocesan News & Announcements",
    "description": "Latest announcements and news updates from the Malabar Independent Syrian Church.",
    "itemListElement": newsList.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://nuhro-thozhiyoor.vercel.app/news/${item.id}`,
      "name": item.title,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-12 font-jakarta animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      
      {/* HEADER */}
      <div className="flex flex-col gap-3 text-center pt-4">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary flex items-center justify-center gap-1.5">
          <Newspaper size={15} className="animate-float" />
          {isMl ? "അറിയിപ്പുകളും വാർത്തകളും" : "Official Diocesan Communique"}
        </span>

        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {isMl ? "സഭാ വാർത്തകൾ" : "News & Events"}
        </h1>

        <p className="text-mutedText max-w-2xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {isMl
            ? "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ വാർത്തകളും ഔദ്യോഗിക അറിയിപ്പുകളും ഇവിടെ വായിക്കാം."
            : "Pastoral announcements, calendar feasts, episcopal statements, and diocese events from the See of Thozhiyoor."}
        </p>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto mt-3" />
      </div>

      {/* CONTENT LIST */}
      {newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => {
            const title = isMl ? item.titleMalayalam : item.title;
            const content = isMl ? item.contentMalayalam : item.content;
            const cleanSnippet = content.substring(0, 180).replace(/[#*`_]/g, "");
            const readableDate = new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl bg-gradient-to-b from-surface/90 to-cardElevated/80 border border-gold-primary/15 hover:border-gold-primary/40 transition-all duration-300 p-6 shadow-xl hover:shadow-gold-glow/20 group relative overflow-hidden"
              >
                {item.imageUrl && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gold-primary/20 mb-5 bg-background shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-60" />
                  </div>
                )}
                
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-gold-primary font-bold mb-3 border-b border-gold-primary/10 pb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    <time dateTime={new Date(item.date).toISOString()}>{readableDate}</time>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/20 text-[9px] uppercase tracking-wider">
                    {isMl ? "അറിയിപ്പ്" : "Dispatch"}
                  </span>
                </div>
                
                <h2 className="font-cinzel text-base md:text-lg font-bold text-parchment group-hover:text-gold-primary transition-colors leading-snug mb-3">
                  <Link href={`/news/${item.id}`} className="hover:underline">
                    {title}
                  </Link>
                </h2>
                
                <p className="text-mutedText text-xs leading-relaxed line-clamp-3 font-jakarta mb-6">
                  {cleanSnippet}...
                </p>

                <div className="mt-auto pt-3 border-t border-gold-primary/10 flex items-center justify-between">
                  <Link
                    href={`/news/${item.id}`}
                    className="text-gold-primary hover:text-gold-light font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    {isMl ? "വിശദമായി വായിക്കുക" : "Read Full Story"}
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-mutedText border border-dashed border-gold-primary/20 rounded-xl max-w-lg mx-auto bg-surface/50 p-8">
          {isMl ? "വാർത്തകൾ ലഭ്യമല്ല." : "No announcements or news dispatches published yet."}
        </div>
      )}
    </div>
  );
}
