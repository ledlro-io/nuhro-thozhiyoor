import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Shield, Award } from "lucide-react";

async function getMetropolitan(slug: string) {
  try {
    return await prisma.metropolitan.findUnique({
      where: { slug },
    });
  } catch (error) {
    return null;
  }
}

export default async function MetropolitanDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const metropolitan = await getMetropolitan(params.slug);

  if (!metropolitan) {
    notFound();
  }

  // Cover photo fallback
  const coverUrl = metropolitan.coverImageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 text-parchment font-jakarta">
      {/* Back link */}
      <Link
        href="/metropolitans"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-6 transition-colors z-20 relative"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ പോവുക" : "Back to Metropolitans"}
      </Link>

      <article className="relative rounded-2xl bg-surface border border-gold-primary/10 overflow-hidden shadow-2xl manuscript-border mb-12">
        {/* 1. Cover Photo Banner */}
        <div className="h-48 sm:h-72 w-full relative overflow-hidden bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl}
            alt="Cover banner"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent pointer-events-none" />
        </div>

        {/* 2. Profile Overlap & Title Header */}
        <div className="px-6 sm:px-10 pb-6 relative z-10 -mt-16 sm:-mt-24 flex flex-col md:flex-row gap-6 items-start md:items-end">
          {/* Portrait Image */}
          <div className="w-32 h-44 sm:w-44 sm:h-56 rounded-lg overflow-hidden border-2 border-gold-primary/30 bg-background shadow-gold-glow flex-shrink-0 relative z-20 manuscript-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metropolitan.imageUrl || "/logo.jpg"}
              alt={isMl ? metropolitan.nameMalayalam : metropolitan.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title and stats summary */}
          <div className="flex-grow flex flex-col gap-2 pt-2 md:pt-0">
            <div className="flex flex-wrap items-center gap-3 text-gold-primary text-[10px] font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Shield size={12} /> {isMl ? metropolitan.titleMalayalam : metropolitan.title}
              </span>
              <span className="text-gold-primary/30">&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {isMl ? "ഭരണകാലം" : "Reign"}: {metropolitan.reignStart} – {metropolitan.reignEnd}
              </span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-primary leading-tight mt-1">
              {isMl ? metropolitan.nameMalayalam : metropolitan.name}
            </h1>

            <p className="text-mutedText italic text-xs leading-relaxed max-w-2xl mt-1 line-clamp-2">
              {isMl ? metropolitan.bioSummaryMalayalam : metropolitan.bioSummary}
            </p>
          </div>
        </div>

        {/* 3. Detailed Metadata Stats Grid */}
        <div className="mx-6 sm:mx-10 my-4 border-t border-b border-gold-primary/10 py-5 grid grid-cols-2 md:grid-cols-5 gap-4 text-xs md:text-sm bg-background/30 rounded-lg px-4 md:px-6">
          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">{isMl ? "ജനനം" : "Date of Birth"}</span>
            <span className="text-parchment font-semibold">{metropolitan.dob || "Unknown"}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">{isMl ? "മരണം" : "Date of Death"}</span>
            <span className="text-parchment font-semibold">{metropolitan.dod || (isMl ? "ജീവിച്ചിരിക്കുന്നു" : "Living / Active")}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">{isMl ? "മേല്പട്ട അഭിഷേകം" : "Consecration"}</span>
            <span className="text-parchment font-semibold">{metropolitan.consecration || "N/A"}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">{isMl ? "മുൻഗാമി" : "Predecessor"}</span>
            <span className="text-parchment font-semibold">{metropolitan.predecessor || "None"}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">{isMl ? "പിൻഗാമി" : "Successor"}</span>
            <span className="text-parchment font-semibold">{metropolitan.successor || "N/A"}</span>
          </div>
        </div>

        {/* 4. Biography Content */}
        <div className="px-6 sm:px-10 pb-10 pt-4">
          <div className="manuscript-body prose prose-invert max-w-none leading-relaxed text-sm sm:text-base text-parchment font-cormorant text-xl">
            <ReactMarkdown>
              {isMl ? metropolitan.biographyMalayalam : metropolitan.biography}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
