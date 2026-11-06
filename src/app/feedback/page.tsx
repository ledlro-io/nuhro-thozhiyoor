"use client";

import React, { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Star, Send, CheckCircle, MessageSquare } from "lucide-react";
import Separator from "@/components/Separator";

export default function FeedbackPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to submit rating.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 md:px-6 text-parchment flex flex-col gap-10 font-jakarta">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Visitor Voices", "സന്ദർശക അഭിപ്രായങ്ങൾ")}
        </span>
        <h1 className="font-cinzel text-3xl font-bold text-gold-primary">
          {t("Visitor Feedback", "അഭിപ്രായങ്ങൾ അറിയിക്കുക")}
        </h1>
        <p className="text-mutedText text-xs leading-relaxed max-w-sm mx-auto mt-1">
          {t(
            "Share your thoughts, suggestions, or scholarly corrections regarding our digital manuscript archive.",
            "ഞങ്ങളുടെ ഡിജിറ്റൽ ആർക്കൈവിനെക്കുറിച്ചുള്ള നിങ്ങളുടെ അഭിപ്രായങ്ങളും നിർദ്ദേശങ്ങളും ഇവിടെ രേഖപ്പെടുത്താം."
          )}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary/30 mx-auto mt-2" />
      </div>

      <div className="p-8 rounded-xl bg-surface border border-gold-primary/10 shadow-2xl glass-panel manuscript-border min-h-[400px] flex flex-col justify-center">
        {submitted ? (
          <div className="text-center py-6 flex flex-col items-center gap-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary mb-2">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-cinzel text-xl text-gold-primary font-bold">
              {t("Thank You!", "നന്ദി!")}
            </h3>
            <p className="text-mutedText text-xs leading-relaxed max-w-xs mx-auto">
              {t(
                "Your feedback has been deposited in our archive databases. We appreciate your interest in our heritage preservation.",
                "നിങ്ങളുടെ പ്രതികരണം ഞങ്ങളുടെ വിവരശേഖരത്തിൽ രേഖപ്പെടുത്തിയിട്ടുണ്ട്. വിലയേറിയ നിർദ്ദേശങ്ങൾക്ക് നന്ദി."
              )}
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-4 py-2 border border-gold-primary/30 text-gold-primary hover:bg-gold-primary/10 text-[10px] font-bold uppercase tracking-wider rounded"
            >
              {t("Submit Another", "വീണ്ടും സമർപ്പിക്കുക")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gold-primary">
                {t("Rate the Experience", "അനുഭവം വിലയിരുത്തുക")}
              </span>
              
              {/* Stars rating selector */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = hoverRating !== null ? star <= hoverRating : star <= rating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 text-gold-primary focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        size={26}
                        fill={filled ? "#e2b56f" : "none"}
                        className={filled ? "drop-shadow-md text-gold-primary" : "text-gold-primary/40"}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="p-3 rounded bg-red-950/20 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold text-gold-primary">
                {t("Full Name", "പൂർണ്ണ നാമം")}
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Rachel Thomas"
                className="px-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold text-gold-primary">
                {t("Email Address", "ഇമെയിൽ വിലാസം")}
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="e.g. rachel@domain.com"
                className="px-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold text-gold-primary">
                {t("Comments / Suggestions", "അഭിപ്രായങ്ങൾ / നിർദ്ദേശങ്ങൾ")}
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t(
                  "Type your suggestions or study feedback here...",
                  "നിങ്ങളുടെ വിലയേറിയ നിർദ്ദേശങ്ങൾ ഇവിടെ എഴുതുക..."
                )}
                className="px-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-relaxed transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded bg-gradient-to-r from-gold-primary to-gold-secondary text-background hover:brightness-110 font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all shadow-gold-glow"
            >
              <Send size={12} />
              {loading ? t("Submitting...", "സമർപ്പിക്കുന്നു...") : t("Submit Feedback", "സമർപ്പിക്കുക")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
