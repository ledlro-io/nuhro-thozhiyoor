import React from "react";
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
  } catch {
    return null;
  }
}

export default async function MetropolitanDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const lang = cookies().get("lang")?.value || "en";
  const isMl = lang === "ml";

  const metropolitan = await getMetropolitan(params.slug);
  if (!metropolitan) notFound();

  const bio = isMl
    ? metropolitan.biographyMalayalam
    : metropolitan.biography;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-10 text-parchment font-jakarta">

      {/* Back Navigation */}
      <Link
        href="/metropolitans"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-primary hover:text-gold-light transition mb-10"
      >
        <ArrowLeft size={14} />
        {isMl ? "തിരികെ പോവുക" : "Back"}
      </Link>

      {/* HEADER CARD */}
      <header className="border-b border-gold-primary/10 pb-8 mb-10">

        <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-widest text-gold-primary font-bold">

          <span className="flex items-center gap-1">
            <Shield size={12} />
            {isMl ? metropolitan.titleMalayalam : metropolitan.title}
          </span>

          <span className="text-mutedText">•</span>

          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {metropolitan.reignStart} – {metropolitan.reignEnd}
          </span>

        </div>

        <h1 className="font-cinzel text-4xl md:text-6xl font-bold text-gold-primary mt-4 leading-tight">
          {isMl ? metropolitan.nameMalayalam : metropolitan.name}
        </h1>

        <p className="mt-4 text-mutedText italic border-l-2 border-gold-primary/30 pl-4 text-sm md:text-base leading-relaxed max-w-3xl">
          {isMl
            ? metropolitan.bioSummaryMalayalam
            : metropolitan.bioSummary}
        </p>
      </header>

      {/* IMAGE */}
      {metropolitan.imageUrl && (
        <div className="mb-12 rounded-xl overflow-hidden border border-gold-primary/10 bg-black/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={metropolitan.imageUrl}
            alt={metropolitan.name}
            className="w-full max-h-[420px] object-cover opacity-85"
          />
        </div>
      )}

      {/* BIOGRAPHY (ADVANCED TYPOGRAPHY SYSTEM) */}
      <article className="max-w-3xl mx-auto text-mutedText/90 text-[16px] md:text-[17px] leading-9 tracking-normal">

        <ReactMarkdown
          components={{
            p: ({ children, node }: any) => {
              const isFirst = node?.position?.start?.line === 1;

              return (
                <p
                  className={[
                    "mb-7 text-justify leading-9",
                    "first:mt-0",
                    isFirst
                      ? "text-[17px] md:text-[18px]"
                      : ""
                  ].join(" ")}
                >
                  {children}
                </p>
              );
            },

            strong: ({ children }) => (
              <strong className="text-gold-primary font-semibold">
                {children}
              </strong>
            ),

            h1: ({ children }) => (
              <h1 className="text-2xl font-cinzel text-gold-primary mt-10 mb-4">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="text-xl font-cinzel text-gold-primary mt-8 mb-3">
                {children}
              </h2>
            ),

            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {children}
              </ul>
            ),

            li: ({ children }) => (
              <li className="leading-8">{children}</li>
            ),
          }}
        >
          {bio}
        </ReactMarkdown>

      </article>
    </div>
  );
}