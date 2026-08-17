import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Events | Nuhro Thozhiyoor",
  description: "Read latest announcements, parish news, community celebrations, and diocese updates from the See of Thozhiyoor.",
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

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-12 font-jakarta animate-fade-in">
      
      {/* HEADER */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary flex items-center justify-center gap-1.5">
          <Newspaper size={14} className="animate-float" />
          {isMl ? "അറിയിപ്പുകളും വാർത്തകളും" : "Updates & Announcements"}
        </span>

        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {isMl ? "സഭാ വാർത്തകൾ" : "News & Events"}
        </h1>

        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {isMl
            ? "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ വാർത്തകളും ഔദ്യോഗിക അറിയിപ്പുകളും ഇവിടെ വായിക്കാം."
            : "Stay updated with the latest news, episcopal statements, calendar events, and pastoral updates from the diocese."}
        </p>

        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      {/* CONTENT LIST */}
      {newsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((item) => {
            const title = isMl ? item.titleMalayalam : item.title;
            const content = isMl ? item.contentMalayalam : item.content;
            
            return (
              <article
                key={item.id}
                className="flex flex-col rounded-xl bg-surface border border-gold-primary/5 hover:border-gold-primary/20 transition-all duration-300 p-5 shadow-lg group relative"
              >
                {item.imageUrl && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gold-primary/10 mb-4 bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gold-primary font-bold mb-2">
                  <Calendar size={11} />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
                
                <h3 className="font-cinzel text-sm md:text-base font-bold text-parchment group-hover:text-gold-primary transition-colors leading-tight mb-2">
                  {title}
                </h3>
                
                <p className="text-mutedText text-xs leading-relaxed line-clamp-4 font-cormorant text-base mb-6">
                  {content}
                </p>

                <div className="mt-auto">
                  <Link
                    href={`/news/${item.id}`}
                    className="text-gold-primary hover:text-gold-light font-semibold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-all w-fit"
                  >
                    {isMl ? "വിശദമായി വായിക്കുക" : "Read Full Story"}{" "}
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-mutedText border border-dashed border-gold-primary/20 rounded-xl max-w-lg mx-auto bg-surface/50 p-6">
          {isMl ? "വാർത്തകൾ ലഭ്യമല്ല." : "No news announcements posted yet."}
        </div>
      )}
    </div>
  );
}
