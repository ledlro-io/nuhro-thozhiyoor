import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Award, Shield } from "lucide-react";
import Separator from "@/components/Separator";

async function getMetropolitans() {
  try {
    return await prisma.metropolitan.findMany({
      orderBy: { order: "asc" },
    });
  } catch (error) {
    console.error("Error fetching metropolitans:", error);
    return [];
  }
}

export default async function MetropolitansListPage() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const metropolitans = await getMetropolitans();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col gap-10 text-parchment font-jakarta">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {isMl ? "കാനോനിക പിന്തുടർച്ച" : "Episcopal Succession"}
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {isMl ? "തൊഴിയൂർ സഭയിലെ മെത്രാപ്പോലീത്തമാർ" : "Metropolitans of the Thozhiyoor See"}
        </h1>
        <p className="text-mutedText text-xs md:text-sm leading-relaxed mt-1">
          {isMl
            ? "കാട്ടുമങ്ങാട്ട് വലിയ ബാവാ മുതൽ ഇന്നത്തെ മെത്രാപ്പോലീത്ത വരെ സഭയെ നയിച്ച അഭിവന്ദ്യ പിതാക്കന്മാരുടെ വിവരങ്ങൾ."
            : "The unbroken apostolic succession line of the Malabar Independent Syrian Church, beginning from the founding Kattumangattu family to the present day."}
        </p>
        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-3" />
      </div>

      {/* Founder Spotlight */}
      <div className="bg-gold-primary/5 border border-gold-primary/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-5 items-center shadow-lg manuscript-border">
        <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary flex-shrink-0">
          <Award size={22} className="animate-float" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-cinzel text-sm md:text-base font-bold text-gold-primary">
            {isMl ? "കാട്ടുമങ്ങാട്ട് ബാവാമാരുടെ കബറിടം" : "The Kattumangattu Family Roots"}
          </h3>
          <p className="text-mutedText text-[11px] md:text-xs leading-relaxed">
            {isMl
              ? "സഭയുടെ ആദ്യ രണ്ട് മെത്രാന്മാരായ അബ്രഹാം മാർ കൂറിലോസ് I, ഗീവർഗീസ് മാർ കൂറിലോസ് II എന്നിവർ കുന്നംകുളത്തെ പ്രശസ്തമായ കാട്ടുമങ്ങാട്ട് കുടുംബാംഗങ്ങളായിരുന്നു. തൊഴിയൂർ കത്തീഡ്രലിൽ ഉള്ള ഇവരുടെ കബറിടങ്ങൾ സഭയുടെ ഏറ്റവും പരിശുദ്ധമായ ചരിത്ര സ്മാരകങ്ങളാണ്."
              : "The first two Metropolitans, Abraham Mar Koorilose I and Geevarghese Mar Koorilose II, were siblings from the historic Kattumangattu family in Kunnamkulam. Together, they are revered in liturgy and history as the Kattumangattu Bavas."}
          </p>
        </div>
      </div>

      <Separator />

      {/* Grid of Metropolitans */}
      {metropolitans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {metropolitans.map((metro) => (
            <div
              key={metro.id}
              className="group relative rounded-xl bg-cardElevated border border-gold-primary/10 overflow-hidden shadow-xl hover:border-gold-primary/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Reign duration ribbon */}
              <div className="absolute top-4 right-4 bg-gold-primary/10 border border-gold-primary/30 px-3 py-1 rounded text-[10px] font-mono font-semibold text-gold-primary">
                {isMl ? "ഭരണകാലം" : "Reign"}: {metro.reignStart} – {metro.reignEnd}
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-gold-primary/80">
                  <Shield size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {isMl ? metro.titleMalayalam : metro.title}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-parchment group-hover:text-gold-primary transition-colors">
                    {isMl ? metro.nameMalayalam : metro.name}
                  </h3>
                  <div className="w-8 h-[1px] bg-gold-primary/30" />
                </div>

                <p className="text-mutedText text-xs md:text-sm leading-relaxed mt-2 line-clamp-3 font-cormorant text-lg">
                  {isMl ? metro.bioSummaryMalayalam : metro.bioSummary}
                </p>
              </div>

              <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 mt-auto">
                <Link
                  href={`/metropolitans/${metro.slug}`}
                  className="w-full py-2.5 rounded border border-gold-primary/20 hover:bg-gold-primary/10 font-bold text-[10px] text-gold-primary tracking-wider uppercase text-center flex items-center justify-center gap-1.5 transition-all"
                >
                  {isMl ? "വിശദമായ ജീവചരിത്രം" : "Read Biography"}{" "}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gold-primary/20 rounded-xl max-w-lg mx-auto bg-surface/50 p-6">
          <p className="text-mutedText text-xs">No Metropolitan biographies have been seeded yet.</p>
        </div>
      )}
    </div>
  );
}
