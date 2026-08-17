import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";
import ShareButtons from "@/components/ShareButtons";

async function getNewsItem(id: string) {
  try {
    return await prisma.news.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
}

// Generate dynamic SEO metadata for the news item
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const newsItem = await getNewsItem(params.id);

  if (!newsItem) {
    return {
      title: "Announcement Not Found | Nuhro Thozhiyoor",
    };
  }

  const title = `${newsItem.title} | Nuhro Thozhiyoor News`;
  const description = newsItem.content.substring(0, 160) + "...";
  const imageUrl = newsItem.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: newsItem.title,
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

export default async function NewsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const newsItem = await getNewsItem(params.id);

  if (!newsItem) {
    notFound();
  }

  const title = isMl ? newsItem.titleMalayalam : newsItem.title;
  const content = isMl ? newsItem.contentMalayalam : newsItem.content;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-parchment font-jakarta animate-fade-in">
      {/* Back button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ വാർത്തകളിലേക്ക്" : "Back to News & Events"}
      </Link>

      <article className="flex flex-col gap-8">
        
        {/* Header Metadata */}
        <div className="flex flex-col gap-4 border-b border-gold-primary/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-primary/10 border border-gold-primary/20">
              {isMl ? "സഭാ അറിയിപ്പ്" : "Announcement"}
            </span>
            <span className="text-mutedText">&bull;</span>
            <span className="flex items-center gap-1.5 text-mutedText">
              <Calendar size={13} />
              {new Date(newsItem.date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-primary leading-tight mt-2">
            {title}
          </h1>
        </div>

        {/* Social Share Buttons */}
        <ShareButtons title={title} path={`/news/${newsItem.id}`} />

        {/* Banner image */}
        {newsItem.imageUrl && (
          <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl border border-gold-primary/10 bg-background shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={newsItem.imageUrl}
              alt={title}
              className="w-full h-full object-cover opacity-80"
              style={{ maxHeight: "400px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        )}

        {/* Article Body with manuscript styling */}
        <div className="manuscript-body prose prose-invert max-w-none leading-relaxed mt-4 font-cormorant text-xl text-parchment">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>

      </article>
    </div>
  );
}
