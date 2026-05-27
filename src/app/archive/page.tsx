"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Calendar, BookOpen, Tag } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Separator from "@/components/Separator";

interface Post {
  id: string;
  title: string;
  titleMalayalam: string;
  slug: string;
  summary: string;
  summaryMalayalam: string;
  category: string;
  tags: string;
  imageUrl?: string;
  createdAt: string;
  publishedAt?: string;
}

export default function ArchivePage() {
  const { language, t } = useLanguage();
  const isMl = language === "ml";

  const categories = [
    t("All", "എല്ലാം"),
    "History",
    "Manuscripts",
    "Theology",
    "Traditions",
  ];

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "All" && selectedCategory !== "എല്ലാം") {
        // Map category back to english key for API compatibility
        const engCategory = selectedCategory === "എല്ലാം" ? "All" : selectedCategory;
        queryParams.append("category", engCategory);
      }
      if (search) {
        queryParams.append("search", search);
      }

      const res = await fetch(`/api/posts?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Failed to fetch archive posts:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, search]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-10 font-jakarta">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Scholarly Manuscripts", "ഗവേഷണ ശേഖരങ്ങൾ")}
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {t("Digital Heritage Archive", "രേഖകളുടെ സൂക്ഷിപ്പുകൾ")}
        </h1>
        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {t(
            "Search through theological articles, ancient manuscript records, and historical research papers regarding the Thozhiyoor episcopal tradition.",
            "തൊഴിയൂർ ഭദ്രാസനത്തിന്റെ ചരിത്രം, സഭാ ആരാധനാ പാരമ്പര്യം എന്നിവ സംബന്ധിച്ച പുരാതന രേഖകളും പ്രബന്ധങ്ങളും ഇവിടെ തിരയാം."
          )}
        </p>
        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-4 rounded-xl border border-gold-primary/10 shadow-lg select-none">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mutedText" />
          <input
            type="text"
            placeholder={t("Search manuscripts...", "തിരയുക...")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const apiCatKey = cat === "എല്ലാം" ? "All" : cat;
            const isSelected = selectedCategory === cat || (cat === "All" && selectedCategory === "എല്ലാം") || (cat === "എല്ലാം" && selectedCategory === "All");
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(apiCatKey)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-gold-primary text-background shadow-gold-glow"
                    : "bg-background border border-gold-primary/10 text-mutedText hover:border-gold-primary/25"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Archives List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col md:flex-row rounded-xl bg-surface border border-gold-primary/5 hover:border-gold-primary/20 overflow-hidden shadow-xl transition-all duration-300 group"
            >
              {post.imageUrl && (
                <div className="w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl}
                    alt={isMl ? post.titleMalayalam : post.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-background/95 border border-gold-primary/20 text-[9px] font-bold uppercase tracking-wider text-gold-primary">
                    {post.category}
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-mutedText">
                    <Calendar size={11} />
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                  </div>
                  
                  <h3 className="font-cinzel text-lg font-bold text-parchment group-hover:text-gold-primary transition-colors leading-tight mt-1">
                    <Link href={`/posts/${post.slug}`}>{isMl ? post.titleMalayalam : post.title}</Link>
                  </h3>
                  
                  <p className="text-mutedText text-xs leading-relaxed mt-1 line-clamp-3 font-cormorant text-base">
                    {isMl ? post.summaryMalayalam : post.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gold-primary/5 pt-4 mt-2 select-none">
                  <div className="flex items-center gap-1.5 text-[10px] text-gold-primary/80">
                    <Tag size={10} />
                    <span className="font-mono">{post.tags.split(",")[0] || post.category}</span>
                  </div>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-[10px] font-bold text-gold-primary hover:text-gold-light uppercase tracking-wider flex items-center gap-1 hover:translate-x-0.5 transition-all"
                  >
                    {t("Read Post", "വായിക്കുക")} <BookOpen size={11} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gold-primary/10 rounded-xl bg-surface/30 max-w-md mx-auto p-6 flex flex-col gap-4">
          <p className="text-mutedText text-xs">
            {t("No archives matching your criteria were found.", "രേഖകൾ ഒന്നും കണ്ടെത്തിയില്ല.")}
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="px-4 py-2 rounded bg-gold-primary/10 border border-gold-primary/30 text-gold-primary text-xs font-semibold hover:bg-gold-primary/20 transition-colors mx-auto"
          >
            {t("Clear Filters", "ഫിൽറ്ററുകൾ ഒഴിവാക്കുക")}
          </button>
        </div>
      )}
    </div>
  );
}
