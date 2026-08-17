import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Shield, Award } from "lucide-react";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

async function getMetropolitan(slug: string) {
  try {
    return await prisma.metropolitan.findUnique({
      where: { slug },
    });
  } catch (error) {
    return null;
  }
}

// Generate dynamic metadata for previews (WhatsApp, FB, Twitter)
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metropolitan = await getMetropolitan(params.slug);

  if (!metropolitan) {
    return {
      title: "Metropolitan Not Found | Nuhro Thozhiyoor",
    };
  }

  const title = `${metropolitan.title} ${metropolitan.name}`;
  const description = metropolitan.bioSummary;
  const imageUrl = metropolitan.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800";

  return {
    title: `${title} | Nuhro Thozhiyoor`,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title,
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

// Helper to look up slugs for predecessor/successor text links
function getMetroLink(
  nameText: string | null,
  isMl: boolean,
  allMetros: { name: string; nameMalayalam: string; slug: string }[]
) {
  if (!nameText) return null;
  const normalized = nameText.trim().toLowerCase();

  const match = allMetros.find((m) => {
    const target = (isMl ? m.nameMalayalam : m.name).trim().toLowerCase();
    const targetEn = m.name.trim().toLowerCase();
    return (
      normalized.includes(target) ||
      target.includes(normalized) ||
      normalized.includes(targetEn) ||
      targetEn.includes(normalized)
    );
  });

  if (match) {
    return `/metropolitans/${match.slug}`;
  }
  return null;
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

  // Fetch all metropolitans for predecessor/successor linking
  let allMetros: { name: string; nameMalayalam: string; slug: string }[] = [];
  try {
    allMetros = await prisma.metropolitan.findMany({
      select: {
        name: true,
        nameMalayalam: true,
        slug: true,
      },
    });
  } catch (err) {
    console.error(err);
  }

  // Fetch posts and news for relevance matching
  let matchedPosts: any[] = [];
  let matchedNews: any[] = [];
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });
    const news = await prisma.news.findMany();

    const nameEn = metropolitan.name.toLowerCase();
    const nameMl = metropolitan.nameMalayalam.toLowerCase();
    const slugParts = metropolitan.slug.replace(/-/g, " ");

    matchedPosts = posts
      .filter((p) => {
        const tEn = p.title.toLowerCase();
        const cEn = p.content.toLowerCase();
        const tMl = p.titleMalayalam.toLowerCase();
        const cMl = p.contentMalayalam.toLowerCase();

        return (
          tEn.includes(nameEn) ||
          cEn.includes(nameEn) ||
          tEn.includes(slugParts) ||
          (nameMl && (tMl.includes(nameMl) || cMl.includes(nameMl)))
        );
      })
      .slice(0, 2);

    matchedNews = news
      .filter((n) => {
        const tEn = n.title.toLowerCase();
        const cEn = n.content.toLowerCase();
        const tMl = n.titleMalayalam.toLowerCase();
        const cMl = n.contentMalayalam.toLowerCase();

        return (
          tEn.includes(nameEn) ||
          cEn.includes(nameEn) ||
          (nameMl && (tMl.includes(nameMl) || cMl.includes(nameMl)))
        );
      })
      .slice(0, 2);
  } catch (err) {
    console.error(err);
  }

  // Cover photo fallback
  const coverUrl =
    metropolitan.coverImageUrl ||
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 text-parchment font-jakarta animate-fade-in">
      {/* Back link */}
      <Link
        href="/metropolitans"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-6 transition-colors z-20 relative"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ പോവുക" : "Back to Metropolitans"}
      </Link>

      <article className="relative rounded-2xl bg-surface border border-gold-primary/10 overflow-hidden shadow-2xl manuscript-border mb-8">
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
                <Award size={12} /> {isMl ? "ഭരണകാലം" : "Reign"}: {metropolitan.reignStart} – {metropolitan.reignEnd}
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
        <div
          className={`mx-6 sm:mx-10 my-4 border-t border-b border-gold-primary/10 py-5 grid grid-cols-2 ${
            metropolitan.dod ? "md:grid-cols-5" : "md:grid-cols-4"
          } gap-4 text-xs md:text-sm bg-background/30 rounded-lg px-4 md:px-6`}
        >
          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">
              {isMl ? "ജനനം" : "Date of Birth"}
            </span>
            <span className="text-parchment font-semibold">{metropolitan.dob || "Unknown"}</span>
          </div>

          {metropolitan.dod && (
            <div>
              <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">
                {isMl ? "മരണം" : "Date of Death"}
              </span>
              <span className="text-parchment font-semibold">{metropolitan.dod}</span>
            </div>
          )}

          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">
              {isMl ? "മേല്പട്ട അഭിഷേകം" : "Consecration"}
            </span>
            <span className="text-parchment font-semibold">{metropolitan.consecration || "N/A"}</span>
          </div>

          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">
              {isMl ? "മുൻഗാമി" : "Predecessor"}
            </span>
            <span className="text-parchment font-semibold">
              {metropolitan.predecessor ? (
                (() => {
                  const link = getMetroLink(metropolitan.predecessor, isMl, allMetros);
                  return link ? (
                    <Link
                      href={link}
                      className="text-gold-primary hover:text-gold-light hover:underline font-semibold transition-colors"
                    >
                      {metropolitan.predecessor}
                    </Link>
                  ) : (
                    metropolitan.predecessor
                  );
                })()
              ) : (
                isMl ? "ആരുമില്ല" : "None"
              )}
            </span>
          </div>

          <div>
            <span className="text-[9px] uppercase font-bold text-gold-primary/70 block mb-0.5">
              {isMl ? "പിൻഗാമി" : "Successor"}
            </span>
            <span className="text-parchment font-semibold">
              {metropolitan.successor ? (
                (() => {
                  const link = getMetroLink(metropolitan.successor, isMl, allMetros);
                  return link ? (
                    <Link
                      href={link}
                      className="text-gold-primary hover:text-gold-light hover:underline font-semibold transition-colors"
                    >
                      {metropolitan.successor}
                    </Link>
                  ) : (
                    metropolitan.successor
                  );
                })()
              ) : (
                isMl ? "N/A" : "N/A"
              )}
            </span>
          </div>
        </div>

        {/* 4. Social Sharing Section */}
        <div className="mx-6 sm:mx-10 mb-4">
          <ShareButtons
            title={isMl ? metropolitan.nameMalayalam : metropolitan.name}
            path={`/metropolitans/${metropolitan.slug}`}
          />
        </div>

        {/* 5. Biography Content */}
        <div className="px-6 sm:px-10 pb-10 pt-4">
          <div className="manuscript-body prose prose-invert max-w-none leading-relaxed text-sm sm:text-base text-parchment font-cormorant text-xl">
            <ReactMarkdown>
              {isMl ? metropolitan.biographyMalayalam : metropolitan.biography}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* 6. Related posts & news */}
      {(matchedPosts.length > 0 || matchedNews.length > 0) && (
        <section className="mt-12 mb-16 relative z-10 animate-fade-in">
          <h3 className="font-cinzel text-lg font-bold text-gold-primary border-b border-gold-primary/10 pb-2 mb-6">
            {isMl ? "ബന്ധപ്പെട്ട ചരിത്ര രേഖകളും വാർത്തകളും" : "Related History & Announcements"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Related Research Posts */}
            {matchedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="p-5 rounded-xl bg-surface/50 border border-gold-primary/5 hover:border-gold-primary/30 hover:bg-surface/80 transition-all duration-300 flex flex-col gap-2 group backdrop-blur-sm shadow-lg hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 text-[10px] text-gold-primary uppercase font-bold">
                  <span>{post.category}</span>
                  <span>&bull;</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <h4 className="font-cinzel text-sm font-bold text-parchment group-hover:text-gold-primary transition-colors leading-tight">
                  {isMl ? post.titleMalayalam : post.title}
                </h4>
                <p className="text-mutedText text-xs line-clamp-2 leading-relaxed">
                  {isMl ? post.summaryMalayalam : post.summary}
                </p>
                <span className="text-[10px] text-gold-primary hover:text-gold-light font-semibold uppercase tracking-wider mt-auto pt-2 flex items-center gap-1">
                  {post.category === "manuscript"
                    ? isMl
                      ? "ഹസ്തലിഖിതം വായിക്കുക"
                      : "Read Manuscript"
                    : isMl
                    ? "ലേഖനം വായിക്കുക"
                    : "Read Post"}{" "}
                  <ArrowLeft size={10} className="rotate-180 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}

            {/* Related News Announcements */}
            {matchedNews.map((n) => (
              <div
                key={n.id}
                className="p-5 rounded-xl bg-surface/50 border border-gold-primary/5 hover:border-gold-primary/20 transition-all duration-300 flex flex-col gap-2 backdrop-blur-sm shadow-lg"
              >
                <div className="flex items-center gap-2 text-[10px] text-gold-light uppercase font-bold">
                  <span>{isMl ? "വാർത്ത / അറിയിപ്പ്" : "Announcement"}</span>
                  <span>&bull;</span>
                  <span>{new Date(n.date).toLocaleDateString()}</span>
                </div>
                <h4 className="font-cinzel text-sm font-bold text-parchment leading-tight">
                  {isMl ? n.titleMalayalam : n.title}
                </h4>
                <p className="text-mutedText text-xs leading-relaxed">
                  {isMl ? n.contentMalayalam : n.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
