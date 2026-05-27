import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

async function getPost(slug: string) {
  try {
    return await prisma.post.findUnique({
      where: { slug },
    });
  } catch (error) {
    return null;
  }
}

export default async function PostDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const post = await getPost(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  const activeTitle = isMl ? post.titleMalayalam : post.title;
  const activeSummary = isMl ? post.summaryMalayalam : post.summary;
  const activeContent = isMl ? post.contentMalayalam : post.content;

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-parchment font-jakarta">
      {/* Back button */}
      <Link
        href="/archive"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> {isMl ? "തിരികെ ആർക്കൈവിലേക്ക്" : "Back to Archive"}
      </Link>

      <article className="flex flex-col gap-8">
        {/* Header Metadata */}
        <div className="flex flex-col gap-4 border-b border-gold-primary/10 pb-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-gold-primary">
            <span className="px-2.5 py-0.5 rounded-full bg-gold-primary/10 border border-gold-primary/20">
              {post.category}
            </span>
            <span className="text-mutedText">&bull;</span>
            <span className="flex items-center gap-1.5 text-mutedText">
              <Calendar size={13} />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-primary leading-tight mt-2">
            {activeTitle}
          </h1>

          <p className="text-mutedText italic text-xs md:text-sm border-l-2 border-gold-primary/30 pl-4 mt-2">
            {activeSummary}
          </p>
        </div>

        {/* Social Share Buttons */}
        <ShareButtons title={activeTitle} slug={post.slug} />

        {/* Banner image */}
        {post.imageUrl && (
          <div className="relative w-full max-h-[400px] overflow-hidden rounded-xl border border-gold-primary/10 bg-background shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={activeTitle}
              className="w-full h-full object-cover opacity-70"
              style={{ maxHeight: "400px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        )}

        {/* Article Body with manuscript drop caps */}
        <div className="manuscript-body prose prose-invert max-w-none leading-relaxed mt-4">
          <ReactMarkdown>
            {activeContent}
          </ReactMarkdown>
        </div>

        {/* Tags footer */}
        {post.tags && (
          <div className="flex flex-wrap items-center gap-2 border-t border-gold-primary/10 pt-6 mt-8">
            <span className="text-xs text-mutedText font-semibold flex items-center gap-1">
              <Tag size={12} /> Tags:
            </span>
            {post.tags.split(",").map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded bg-background border border-gold-primary/10 text-[10px] text-mutedText"
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
