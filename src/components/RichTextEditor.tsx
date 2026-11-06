"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Eye, Edit3, HelpCircle, Globe } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface RichTextEditorProps {
  title: string;
  setTitle: (t: string) => void;
  titleMalayalam: string;
  setTitleMalayalam: (t: string) => void;
  slug: string;
  setSlug: (s: string) => void;
  summary: string;
  setSummary: (s: string) => void;
  summaryMalayalam: string;
  setSummaryMalayalam: (s: string) => void;
  content: string;
  setContent: (c: string) => void;
  contentMalayalam: string;
  setContentMalayalam: (c: string) => void;
  category: string;
  setCategory: (c: string) => void;
  tags: string;
  setTags: (t: string) => void;
  imageUrl: string;
  setImageUrl: (u: string) => void;
  onSave: (published: boolean) => void;
  isSaving: boolean;
  isAdmin?: boolean;
}

export default function RichTextEditor({
  title,
  setTitle,
  titleMalayalam,
  setTitleMalayalam,
  slug,
  setSlug,
  summary,
  setSummary,
  summaryMalayalam,
  setSummaryMalayalam,
  content,
  setContent,
  contentMalayalam,
  setContentMalayalam,
  category,
  setCategory,
  tags,
  setTags,
  imageUrl,
  setImageUrl,
  onSave,
  isSaving,
  isAdmin = true,
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"edit-en" | "edit-ml" | "preview-en" | "preview-ml">("edit-en");
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  return (
    <div className="flex flex-col gap-6 w-full text-parchment">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gold-primary/10 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("edit-en")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "edit-en"
                ? "bg-gold-primary text-background"
                : "bg-surface hover:bg-cardElevated text-gold-primary"
            }`}
          >
            <Edit3 size={14} /> English Editor
          </button>
          <button
            onClick={() => setActiveTab("preview-en")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeTab === "preview-en"
                ? "bg-gold-primary text-background"
                : "bg-surface hover:bg-cardElevated text-gold-primary"
            }`}
          >
            <Eye size={14} /> Preview EN
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCheatsheet(!showCheatsheet)}
            className="flex items-center gap-1.5 text-xs text-mutedText hover:text-gold-primary transition-colors"
          >
            <HelpCircle size={14} /> formatting help
          </button>
          <button
            onClick={() => onSave(false)}
            disabled={isSaving}
            className="px-4 py-2 rounded-md bg-cardElevated hover:bg-cardElevated/80 border border-gold-primary/30 text-gold-primary text-xs font-bold uppercase tracking-widest disabled:opacity-50"
          >
            {isAdmin ? "Save Draft" : "Submit for Review"}
          </button>
          {isAdmin && (
            <button
              onClick={() => onSave(true)}
              disabled={isSaving}
              className="px-5 py-2 rounded-md bg-gradient-to-r from-gold-primary to-gold-secondary text-background hover:brightness-110 text-xs font-extrabold uppercase tracking-widest disabled:opacity-50 shadow-gold-glow"
            >
              {isSaving ? "Publishing..." : "Publish"}
            </button>
          )}
        </div>
      </div>

      {showCheatsheet && (
        <div className="p-4 rounded-lg bg-surface border border-gold-primary/20 text-[11px] leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-gold-primary font-bold mb-1.5">Markdown Basics</h5>
            <p><strong># Heading 1</strong> (Titles)</p>
            <p><strong>## Heading 2</strong> (Headers)</p>
            <p><strong>**Bold Text**</strong> and <em>*Italics*</em></p>
          </div>
          <div>
            <h5 className="text-gold-primary font-bold mb-1.5">Advanced Features</h5>
            <p><strong>[Link Text](URL)</strong> for hyperlinks</p>
            <p><strong>![Alt text](Image URL)</strong> for visuals</p>
            <p><strong>&gt; Blockquotes</strong> for liturgical prayers</p>
          </div>
        </div>
      )}

      {/* Editor Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main forms */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {activeTab === "edit-en" && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-gold-primary">English Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Origins of the Thozhiyoor Episcopal See"
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-sm text-parchment transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-gold-primary">URL Slug (Auto-generated)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface/50 border border-gold-primary/10 text-xs text-mutedText focus:border-gold-primary/50 outline-none transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase font-bold text-gold-primary">English Content (Markdown supported)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  placeholder="Write the English article body using markdown..."
                  className="w-full px-4 py-3 rounded-lg bg-surface border border-gold-primary/20 focus:border-gold-primary/50 outline-none font-mono text-xs text-parchment leading-relaxed transition-all resize-y"
                  required
                />
              </div>
            </div>
          )}

          {/* Preview Windows */}
          {activeTab === "preview-en" && (
            <div className="p-8 rounded-lg bg-surface border border-gold-primary/10 max-w-none shadow-2xl min-h-[400px]">
              <h1 className="font-cinzel text-2xl text-gold-primary mb-4">{title || "Untitled Post"}</h1>
              {summary && <p className="text-mutedText italic text-sm border-l border-gold-primary/30 pl-3 mb-6">{summary}</p>}
              <div className="prose prose-invert prose-sm">
                <ReactMarkdown>{content || "*No English content written yet.*"}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar settings */}
        <div className="flex flex-col gap-5 p-5 rounded-lg bg-surface border border-gold-primary/15 h-fit">
          <h4 className="font-cinzel text-sm text-gold-primary border-b border-gold-primary/10 pb-2 mb-1.5 font-bold tracking-wider">
            Metadata Details
          </h4>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-gold-primary">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
            >
              <option value="History">History</option>
              <option value="Manuscripts">Manuscripts</option>
              <option value="Theology">Theology</option>
              <option value="Traditions">Traditions</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-gold-primary">Tags (Comma split)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. liturgy, syriac"
              className="w-full px-4 py-2 rounded-lg bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
            />
          </div>

          <ImageUpload
            label="Banner Image"
            value={imageUrl}
            onChange={setImageUrl}
            placeholder="https://images.unsplash.com/..."
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-gold-primary">English Summary</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
              placeholder="Brief English summary for lists..."
              className="w-full px-3 py-2 rounded-lg bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
