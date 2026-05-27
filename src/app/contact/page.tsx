"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, MessageSquare } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Separator from "@/components/Separator";

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-10 font-jakarta">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {t("Ecclesial Dialogues", "സഭാ സംവാദങ്ങൾ")}
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {t("Connect & Inquiries", "സമ്പർക്കവും അന്വേഷണങ്ങളും")}
        </h1>
        <p className="text-mutedText max-w-xl mx-auto text-xs md:text-sm leading-relaxed mt-1">
          {t(
            "Have research requests, historical questions, or want to contribute manuscripts? Get in touch with our independent archive team.",
            "ഗവേഷണ ആവശ്യങ്ങൾ, ചരിത്രപരമായ സംശയങ്ങൾ എന്നിവ ഞങ്ങളുടെ സന്നദ്ധ പ്രവർത്തകരുമായി പങ്കുവെക്കാം."
          )}
        </p>
        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
        {/* Left Side: Contact details */}
        <div className="lg:col-span-2 flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-6">
            <h3 className="font-cinzel text-lg md:text-xl text-gold-primary font-bold">
              {t("Heritage Secretariat", "പൈതൃക വിഭാഗം")}
            </h3>
            <p className="text-mutedText text-xs md:text-sm leading-relaxed">
              {t(
                "We welcome collaboration with historians, theology students, and conservators cataloging West Syriac manuscripts.",
                "ചരിത്ര വിദ്യാർത്ഥികൾ, ഓർത്തഡോക്സ് ദൈവശാസ്ത്ര വിശകലന വിദഗ്ദ്ധർ എന്നിവരുമായുള്ള സഹകരണം ഞങ്ങൾ സ്വാഗതം ചെയ്യുന്നു."
              )}
            </p>

            <div className="flex flex-col gap-5 mt-3 select-none">
              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded bg-gold-primary/5 border border-gold-primary/20 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-gold-primary tracking-wider">
                    {t("Archive Enclave", "ആർക്കൈവ് വിലാസം")}
                  </h4>
                  <p className="text-mutedText text-xs md:text-sm mt-0.5">
                    Thozhiyur P.O., Kunnamkulam<br />
                    Thrissur District, Kerala - 680520, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded bg-gold-primary/5 border border-gold-primary/20 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-gold-primary tracking-wider">
                    {t("Electronic Inquiries", "ഇമെയിൽ വിലാസം")}
                  </h4>
                  <p className="text-mutedText text-xs md:text-sm mt-0.5 hover:text-gold-light transition-colors">
                    <a href="mailto:info@nuhrothozhiyoor.org">info@nuhrothozhiyoor.org</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded bg-gold-primary/5 border border-gold-primary/20 flex items-center justify-center text-gold-primary flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-gold-primary tracking-wider">
                    {t("Telephony", "ഫോൺ")}
                  </h4>
                  <p className="text-mutedText text-xs md:text-sm mt-0.5">
                    +91 4885 222 201 <span className="text-[10px] text-mutedText/50 italic">({t("Parish Office", "ഇടവക ഓഫീസ്")})</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent Feedback Button Link */}
            <div className="p-5 rounded-lg border border-gold-primary/20 bg-gold-primary/5 flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-2 text-gold-primary">
                <MessageSquare size={16} />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  {t("Interactive Feedback", "അഭിപ്രായങ്ങൾ സമർപ്പിക്കാം")}
                </span>
              </div>
              <p className="text-mutedText text-[11px] leading-relaxed">
                {t(
                  "Have feedback on our digital archive? Give us a rating and share your thoughts to help us improve.",
                  "ഈ ഡിജിറ്റൽ ശേഖരത്തെക്കുറിച്ചുള്ള വിലയിരുത്തലുകളും റേറ്റിംഗുകളും നൽകാൻ താല്പര്യമുണ്ടോ?"
                )}
              </p>
              <Link
                href="/feedback"
                className="w-full py-2 bg-gold-primary text-background font-bold text-[10px] uppercase tracking-wider text-center rounded hover:brightness-110 shadow-gold-glow transition-all"
              >
                {t("Submit Archive Feedback", "പ്രതികരണങ്ങൾ അറിയിക്കുക")}
              </Link>
            </div>
          </div>

          <div className="p-3.5 rounded bg-gold-primary/5 border border-gold-primary/10 text-[10px] text-mutedText/85 leading-normal flex gap-2">
            <HelpCircle size={14} className="text-gold-primary flex-shrink-0 mt-0.5" />
            <p>
              {t(
                "Note: This is an independent historical archive. For official certificates, baptisms, or administrative diocesan matters, please contact the Thozhiyoor Diocesan Office directly.",
                "ശ്രദ്ധിക്കുക: ഇതൊരു സ്വതന്ത്ര ചരിത്ര പര്യവേക്ഷണ ആർക്കൈവാണ്. ഔദ്യോഗിക സാക്ഷ്യപത്രങ്ങൾ, സാമുദായിക സാക്ഷ്യങ്ങൾ എന്നിവയ്ക്കായി ദയവായി സഭാ കാര്യാലയവുമായി നേരിട്ട് ബന്ധപ്പെടുക."
              )}
            </p>
          </div>
        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-3 p-8 rounded-xl bg-surface border border-gold-primary/10 shadow-2xl flex flex-col justify-center min-h-[400px]">
          {submitted ? (
            <div className="text-center py-8 flex flex-col items-center gap-4 animate-scale-up">
              <div className="w-14 h-14 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary mb-1">
                <CheckCircle size={28} />
              </div>
              <h3 className="font-cinzel text-xl text-gold-primary font-bold">
                {t("Message Dispatched", "സന്ദേശം അയച്ചിരിക്കുന്നു")}
              </h3>
              <p className="text-mutedText text-xs max-w-xs leading-relaxed mx-auto">
                {t(
                  "Thank you. Your inquiry regarding the Thozhiyoor heritage has been recorded. Our research team will get in touch with you.",
                  "നന്ദി. സഭാ ചരിത്ര സംബന്ധിയായ നിങ്ങളുടെ സന്ദേശം ഞങ്ങൾക്ക് ലഭിച്ചിട്ടുണ്ട്. സന്നദ്ധ പ്രവർത്തകർ ഉടൻ മറുപടി നൽകുന്നതാണ്."
                )}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 border border-gold-primary/30 text-gold-primary hover:bg-gold-primary/10 text-[10px] font-bold uppercase tracking-wider rounded"
              >
                {t("Send Another", "മറ്റൊരു സന്ദേശം അയക്കുക")}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
              <h3 className="font-cinzel text-lg text-gold-primary font-bold mb-1">
                {t("Submit a Research Inquiry", "അന്വേഷണങ്ങൾ ഇവിടെ രേഖപ്പെടുത്തുക")}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">
                    {t("Your Name", "നിങ്ങളുടെ പേര്")}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Dr. George Kurian"
                    className="px-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">
                    {t("Your Email", "ഇമെയിൽ വിലാസം")}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. george@domain.com"
                    className="px-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-bold text-gold-primary">
                  {t("Subject", "വിഷയം")}
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Inquiry on 18th-century West Syriac Liturgy"
                  className="px-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase font-bold text-gold-primary">
                  {t("Message", "സന്ദേശം")}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t(
                    "Enter details of your historical query...",
                    "നിങ്ങളുടെ സംശയങ്ങൾ ഇവിടെ രേഖപ്പെടുത്തുക..."
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
                {loading ? t("Dispatching...", "അയക്കുന്നു...") : t("Send Message", "സന്ദേശം അയക്കുക")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
