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

  const metro = await getMetropolitan(params.slug);
  if (!metro) notFound();

  const bio = isMl ? metro.biographyMalayalam : metro.biography;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#e8dcc7] font-serif">

      {/* Container */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">

        {/* Back */}
        <Link
          href="/metropolitans"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c8a96a] hover:text-[#e6c98f] mb-10 transition"
        >
          <ArrowLeft size={14} />
          {isMl ? "തിരികെ പോവുക" : "Back"}
        </Link>

        {/* HEADER */}
        <header className="border-b border-[#c8a96a]/20 pb-8 mb-10">

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#c8a96a]">
            <Shield size={12} />
            {isMl ? metro.titleMalayalam : metro.title}
          </div>

          <h1 className="mt-4 text-4xl md:text-5xl leading-tight font-serif text-[#f3e7d3]">
            {isMl ? metro.nameMalayalam : metro.name}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs text-[#b8a98b]">
            <Calendar size={12} />
            {metro.reignStart} – {metro.reignEnd}
          </div>

          <p className="mt-5 text-[#cfc2ab] leading-relaxed text-sm md:text-base border-l border-[#c8a96a]/30 pl-4">
            {isMl ? metro.bioSummaryMalayalam : metro.bioSummary}
          </p>
        </header>

        {/* IMAGE */}
        {metro.imageUrl && (
          <div className="mb-12 overflow-hidden border border-[#c8a96a]/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={metro.imageUrl}
              alt={metro.name}
              className="w-full max-h-[420px] object-cover opacity-90"
            />
          </div>
        )}

        {/* BIO */}
        <article className="leading-9 text-[#d6c7ad] text-[16px] md:text-[17px]">

          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-6 leading-9 text-justify">
                  {children}
                </p>
              ),

              strong: ({ children }) => (
                <strong className="text-[#e6c98f] font-normal tracking-wide">
                  {children}
                </strong>
              ),

              h1: ({ children }) => (
                <h1 className="mt-10 mb-4 text-xl tracking-widest uppercase text-[#e6c98f]">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="mt-8 mb-3 text-lg text-[#e6c98f] tracking-wide">
                  {children}
                </h2>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-[#d6c7ad]">
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
    </div>
  );
}