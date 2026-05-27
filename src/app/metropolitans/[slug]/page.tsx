import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Shield } from "lucide-react";

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

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-parchment font-jakarta">
      {/* Back link */}
      <Link
        href="/metropolitans"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ പോവുക" : "Back to Metropolitans"}
      </Link>

      <article className="flex flex-col gap-8">
        {/* Banner metadata */}
        <div className="flex flex-col gap-4 border-b border-gold-primary/10 pb-8">
          <div className="flex flex-wrap items-center gap-4 text-gold-primary text-[10px] font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Shield size={13} /> {isMl ? metropolitan.titleMalayalam : metropolitan.title}
            </span>
            <span className="text-mutedText">&bull;</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} /> {isMl ? "ഭരണകാലം" : "Reign"}: {metropolitan.reignStart} – {metropolitan.reignEnd}
            </span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-primary leading-tight mt-1">
            {isMl ? metropolitan.nameMalayalam : metropolitan.name}
          </h1>

          <p className="text-mutedText italic text-xs md:text-sm border-l-2 border-gold-primary/30 pl-4 mt-2">
            {isMl ? metropolitan.bioSummaryMalayalam : metropolitan.bioSummary}
          </p>
        </div>

        {/* Profile Image Option */}
        {metropolitan.imageUrl && (
          <div className="relative w-full max-h-[360px] overflow-hidden rounded-xl border border-gold-primary/10 bg-background shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metropolitan.imageUrl}
              alt={isMl ? metropolitan.nameMalayalam : metropolitan.name}
              className="w-full h-full object-cover opacity-70"
              style={{ maxHeight: "360px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        )}

        {/* Biography Content (Rendered with dropcaps for classic look) */}
        <div className="manuscript-body prose prose-invert max-w-none leading-relaxed mt-4">
          <ReactMarkdown>
            {isMl ? metropolitan.biographyMalayalam : metropolitan.biography}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
