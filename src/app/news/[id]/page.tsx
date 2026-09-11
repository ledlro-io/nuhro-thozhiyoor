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
  const description = newsItem.content.substring(0, 160).replace(/[#*`_]/g, "") + "...";
  const imageUrl = newsItem.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800";
  const isoDate = new Date(newsItem.date).toISOString();

  return {
    title,
    description,
    alternates: {
      canonical: `https://nuhro-thozhiyoor.vercel.app/news/${newsItem.id}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: ["Malabar Independent Syrian Church"],
      siteName: "Nuhro Thozhiyoor",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
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
  const isoDate = new Date(newsItem.date).toISOString();
  const readableDate = new Date(newsItem.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nuhro-thozhiyoor.vercel.app/news/${newsItem.id}`
    },
    "headline": title,
    "description": newsItem.content.substring(0, 160).replace(/[#*`_]/g, ""),
    "image": [
      newsItem.imageUrl || "https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800"
    ],
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": [{
      "@type": "Organization",
      "name": "Malabar Independent Syrian Church",
      "url": "https://nuhro-thozhiyoor.vercel.app"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Nuhro Thozhiyoor Heritage Archive",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nuhro-thozhiyoor.vercel.app/logo.jpg"
      }
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nuhro-thozhiyoor.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "News & Events",
        "item": "https://nuhro-thozhiyoor.vercel.app/news"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://nuhro-thozhiyoor.vercel.app/news/${newsItem.id}`
      }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 text-parchment font-jakarta animate-fade-in">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back button */}
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ വാർത്തകളിലേക്ക്" : "Back to News & Events"}
      </Link>

      <article className="flex flex-col gap-8 bg-surface/80 border border-gold-primary/15 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm">
        
        {/* Header Metadata */}
        <div className="flex flex-col gap-4 border-b border-gold-primary/10 pb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary">
            <span className="px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/20 text-[10px]">
              {isMl ? "സഭാ അറിയിപ്പ്" : "Official Diocese Dispatch"}
            </span>
            <span className="text-mutedText">&bull;</span>
            <time dateTime={isoDate} className="flex items-center gap-1.5 text-mutedText text-xs font-mono">
              <Calendar size={13} />
              {readableDate}
            </time>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold text-gold-primary leading-tight mt-2">
            {title}
          </h1>
        </div>

        {/* Social Share Buttons */}
        <ShareButtons title={title} path={`/news/${newsItem.id}`} />

        {/* Banner image */}
        {newsItem.imageUrl && (
          <div className="relative w-full max-h-[480px] overflow-hidden rounded-xl border border-gold-primary/20 bg-background shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={newsItem.imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              style={{ maxHeight: "480px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Article Body with manuscript styling */}
        <div className="manuscript-body prose prose-invert max-w-none leading-relaxed mt-4 font-cormorant text-xl md:text-2xl text-parchment">
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>

        {/* Communique footer note */}
        <div className="border-t border-gold-primary/15 pt-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-mutedText bg-background/40 p-4 rounded-xl border">
          <div>
            <p className="font-bold text-gold-primary">Malabar Independent Syrian Church</p>
            <p className="text-[11px] mt-0.5">Thozhiyoor Sabha &bull; Diocesan Media & Archive Centre</p>
          </div>
          <time dateTime={isoDate} className="text-[11px] font-mono text-gold-primary/70">
            Published: {readableDate}
          </time>
        </div>

      </article>
    </div>
  );
}
