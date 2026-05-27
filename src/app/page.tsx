import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { BookOpen, Calendar, ArrowRight, ShieldCheck, Sun, Star } from "lucide-react";
import Separator from "@/components/Separator";

async function getFeaturedPosts() {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
  } catch (error) {
    return [];
  }
}

async function getRemembranceMetropolitan() {
  try {
    const today = new Date();
    // Use local Indian Standard Time offset since user local time is +05:30
    const localTime = new Date(today.getTime() + 5.5 * 60 * 60 * 1000);
    const currentMonth = localTime.getUTCMonth() + 1;
    const currentDate = localTime.getUTCDate();

    return await prisma.metropolitan.findFirst({
      where: {
        remembranceMonth: currentMonth,
        remembranceDay: currentDate,
      },
    });
  } catch (error) {
    console.error("Remembrance fetch error:", error);
    return null;
  }
}

export default async function HomePage() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  const featuredPosts = await getFeaturedPosts();
  const remembranceMetro = await getRemembranceMetropolitan();

  return (
    <div className="flex flex-col gap-20 overflow-hidden font-jakarta">
      {/* 1. REMEMBRANCE FEAST BANNER (Orma Perunnal / Dukhrana) */}
      {remembranceMetro && (
        <section className="max-w-4xl mx-auto px-4 w-full mt-4 animate-gold-pulse">
          <div className="relative rounded-xl bg-gradient-to-r from-gold-dark/25 via-background to-gold-dark/25 border-2 border-gold-primary/30 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center text-center md:text-left shadow-gold-glow manuscript-border">
            {/* Golden cross decoration */}
            <div className="w-16 h-16 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary flex-shrink-0 animate-float">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M5 12h14" />
                <circle cx="12" cy="12" r="2" fill="#e2b56f" />
                <circle cx="12" cy="2" r="0.7" fill="#e2b56f" />
                <circle cx="12" cy="22" r="0.7" fill="#e2b56f" />
                <circle cx="5" cy="12" r="0.7" fill="#e2b56f" />
                <circle cx="19" cy="12" r="0.7" fill="#e2b56f" />
              </svg>
            </div>

            <div className="flex-grow flex flex-col gap-2">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-gold-primary">
                {isMl ? "ശ്രദ്ധേയമായ ഓർമ്മ പെരുന്നാൾ (ദുക്റാന)" : "Memorial Feast (Dukhrana) Commemoration"}
              </span>
              <h2 className="font-cinzel text-xl md:text-2xl font-bold text-gold-primary leading-tight">
                {isMl ? remembranceMetro.nameMalayalam : remembranceMetro.name}
              </h2>
              <p className="text-mutedText text-xs md:text-sm leading-relaxed">
                {isMl
                  ? `ഇന്ന് ഭദ്രാസനത്തിന്റെ ${remembranceMetro.titleMalayalam} അബ്രഹാം മാർ കൂറിലോസ് ബാവായുടെ ഓർമ്മ ദിനമാണ്. സഭയുടെ ഉത്ഭവത്തിന് കാരണമായ ഈ ധന്യ പിതാവിനെ നമുക്ക് ഓർക്കാം.`
                  : `Today is the liturgical feast of remembrance of ${remembranceMetro.name}, the ${remembranceMetro.title}. Let us commemorate his dedication to the independent See.`}
              </p>
            </div>

            <Link
              href={`/metropolitans/${remembranceMetro.slug}`}
              className="px-4 py-2 bg-gold-primary text-background font-bold text-xs uppercase tracking-wider rounded hover:brightness-110 shadow-gold-glow flex-shrink-0"
            >
              {isMl ? "ജീവചരിത്രം" : "Read Biography"}
            </Link>
          </div>
        </section>
      )}

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-4 md:px-8 py-10">
        <div className="absolute inset-0 radial-glow opacity-50 z-0 pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <div className="px-3 py-1 rounded-full border border-gold-primary/30 bg-gold-primary/5 text-gold-primary text-[10px] font-bold uppercase tracking-widest animate-gold-pulse">
            {isMl ? "സ്വതന്ത്ര പൈതൃക ഡിജിറ്റൽ ശേഖരം" : "Independent Heritage Initiative"}
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gold-primary leading-snug mt-2">
            {isMl ? (
              <>തൊഴിയൂർ പൈതൃകവും <br /><span className="gold-gradient-text">ആത്മീയ ചരിത്രവും</span></>
            ) : (
              <>Exploring the Heritage <br /><span className="gold-gradient-text">&amp; Legacy of Thozhiyoor</span></>
            )}
          </h1>

          <p className="text-mutedText text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed">
            {isMl
              ? "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ (തൊഴിയൂർ സഭ) ചരിത്രം, വിശുദ്ധ താലിയോലകൾ, പുരാതന ആരാധനാക്രമങ്ങൾ, എപ്പിസ്കോപ്പൽ പാരമ്പര്യം എന്നിവ സംരക്ഷിക്കുന്നതിനുള്ള സ്വതന്ത്ര ആർക്കൈവ്."
              : "An independent digital archive dedicated to documenting the history, sacred manuscripts, West Syriac liturgy, and ecclesial heritage of the Malabar Independent Syrian Church – Thozhiyoor."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/archive"
              className="px-5 py-2.5 rounded bg-gradient-to-r from-gold-primary to-gold-secondary text-background hover:brightness-110 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-gold-glow flex items-center gap-2"
            >
              <BookOpen size={14} /> {isMl ? "രേഖകൾ പരിശോധിക്കുക" : "Explore the Archive"}
            </Link>
            <Link
              href="/about"
              className="px-5 py-2.5 rounded border border-gold-primary/40 hover:bg-gold-primary/10 text-gold-primary text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              {isMl ? "ലക്ഷ്യങ്ങൾ" : "Our Mission"}
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative Ornate Separator */}
      <Separator />

      {/* 3. KATTUMANGATTU BAVAS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full">
        <div className="relative rounded-2xl glass-panel p-8 md:p-14 border border-gold-primary/10 overflow-hidden shadow-2xl manuscript-border">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-primary/5 blur-[70px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2 text-gold-primary">
                <Star size={16} className="animate-float" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {isMl ? "സ്ഥാപക പിതാക്കന്മാർ" : "Founding Patriarchs"}
                </span>
              </div>
              <h2 className="font-cinzel text-2xl md:text-4xl font-bold leading-tight text-gold-primary">
                {isMl ? "കാട്ടുമങ്ങാട്ട് ബാവാമാരുടെ പൈതൃകം" : "The Legacy of the Kattumangattu Bavas"}
              </h2>
              <div className="w-12 h-[1px] bg-gold-primary/30 rounded-full" />
              <p className="text-mutedText leading-relaxed text-xs md:text-sm">
                {isMl ? (
                  <>
                    തൊഴിയൂർ ഭദ്രാസനം രൂപീകൃതമായത് <strong>1772</strong>-ൽ സഭയുടെ സ്വയംഭരണവും കാനോനിക സുറിയാനി ആരാധനാ പാരമ്പര്യവും സംരക്ഷിക്കുന്നതിനുള്ള ശക്തമായ നിലപാടുകളോടെയാണ്. സഭയുടെ സ്ഥാപക പിതാവായ <strong>കാട്ടുമങ്ങാട്ട് അബ്രഹാം മാർ കൂറിലോസ് ഒന്നാമനും (വലിയ ബാവ)</strong> അദ്ദേഹത്തിന്റെ അനുഗാമിയായ സഹോദരൻ <strong>ഗീവർഗീസ് മാർ കൂറിലോസ് രണ്ടാമനും (ഇളയ ബാവ)</strong> കൊച്ചി രാജ്യത്തെ പീഡനങ്ങളെത്തുടർന്ന് ബ്രിട്ടീഷ് അതിർത്തിയായ തൊഴിയൂരിലേക്ക് മാറിയാണ് സഭയുടെ ആസ്ഥാനം പടുത്തുയർത്തിയത്.
                  </>
                ) : (
                  <>
                    The See of Thozhiyoor was born in <strong>1772</strong> out of a struggle for ecclesial autonomy and West Syriac theological purity. 
                    The founder, <strong>Kattumangattu Abraham Mar Koorilose I (Elder Bava)</strong>, and his successor brother, <strong>Geevarghese Mar Koorilose II (Younger Bava)</strong>, 
                    fled political threats in Cochin and established the independent see in 1789.
                  </>
                )}
              </p>
              <p className="text-mutedText leading-relaxed text-xs md:text-sm">
                {isMl
                  ? "അവരുടെ പരിശുദ്ധ കബറിടങ്ങൾ തൊഴിയൂരിലെ വിശുദ്ധ സെന്റ് ജോർജ്ജ് കത്തീഡ്രലിനുള്ളിൽ സ്ഥിതി ചെയ്യുന്നു. ഇത് വിശ്വാസികളുടെ പ്രധാന തീർത്ഥാടന സങ്കേതമാണ്."
                  : "Their sacred tombs, located inside the historic St. George Cathedral in Thozhiyoor, remain a spiritual sanctuary and the canonical anchor of the diocese."}
              </p>
              <Link
                href="/metropolitans"
                className="text-gold-primary hover:text-gold-light font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 mt-2 transition-all group"
              >
                {isMl ? "മെത്രാപ്പോലീത്തമാരുടെ വിവരങ്ങൾ" : "View Succession Line"}{" "}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right graphic box */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md aspect-[4/3] rounded-lg overflow-hidden border border-gold-primary/20 bg-background/50 shadow-gold-glow-lg group manuscript-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1548625361-155deee223d5?q=80&w=800&auto=format&fit=crop"
                  alt="Kattumangattu Bavas Altar"
                  className="w-full h-full object-cover opacity-70 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-gold-primary">
                    {isMl ? "തൊഴിയൂർ കത്തീഡ്രൽ മദ്ബഹ" : "Thozhiyoor Cathedral Altar"}
                  </span>
                  <h4 className="font-cinzel text-base font-bold text-parchment mt-0.5">
                    {isMl ? "സ്ഥാപകരുടെ വിശുദ്ധ കബറിടം" : "Holy Shrine of the Founders"}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT METRICS GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Meaning of Nuhro */}
          <div className="p-7 rounded-xl bg-cardElevated border border-gold-primary/5 hover:border-gold-primary/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-5 group-hover:bg-gold-primary group-hover:text-background transition-all duration-300">
              <Sun size={20} />
            </div>
            <h3 className="font-cinzel text-base font-bold text-gold-primary mb-2">
              {isMl ? "നൂഹ്റോ എന്ന വാക്ക്" : "Meaning of Nuhro"}
            </h3>
            <p className="text-mutedText text-xs md:text-sm leading-relaxed">
              {isMl
                ? "നൂഹ്റോ (ܢܘܗܪܐ) എന്നാൽ സുറിയാനിയിൽ വെളിച്ചം എന്നാണ് അർത്ഥമാക്കുന്നത്. ഇത് സഭയുടെ ചരിത്രം, താലിയോലകൾ, വിശ്വാസം എന്നിവയിലേക്ക് പ്രകാശം പരത്തുന്നു."
                : "Nuhro means Light in classical Syriac. It symbolizes the illumination of historical memory, sacred texts, and liturgical records."}
            </p>
          </div>

          {/* Nature */}
          <div className="p-7 rounded-xl bg-cardElevated border border-gold-primary/5 hover:border-gold-primary/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-5 group-hover:bg-gold-primary group-hover:text-background transition-all duration-300">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-cinzel text-base font-bold text-gold-primary mb-2">
              {isMl ? "സ്വതന്ത്ര പ്രസ്ഥാനം" : "Nature of Archive"}
            </h3>
            <p className="text-mutedText text-xs md:text-sm leading-relaxed">
              {isMl
                ? "ഇത് സഭയുടെ ഔദ്യോഗിക ഭരണ സമിതിയുടേതല്ല, മറിച്ച് ഗവേഷണ താല്പര്യമുള്ള ചരിത്രകാരന്മാരുടെ സ്വതന്ത്ര സംരംഭമാണ്."
                : "This is a non-official, independent academic archive. It is not affiliated with the ecclesiastical administration of the MISC."}
            </p>
          </div>

          {/* Mission */}
          <div className="p-7 rounded-xl bg-cardElevated border border-gold-primary/5 hover:border-gold-primary/20 transition-all duration-300 shadow-xl group">
            <div className="w-10 h-10 rounded bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center text-gold-primary mb-5 group-hover:bg-gold-primary group-hover:text-background transition-all duration-300">
              <Star size={20} />
            </div>
            <h3 className="font-cinzel text-base font-bold text-gold-primary mb-2">
              {isMl ? "ഞങ്ങളുടെ ലക്ഷ്യങ്ങൾ" : "Our Mission"}
            </h3>
            <p className="text-mutedText text-xs md:text-sm leading-relaxed">
              {isMl
                ? "പഴയ സുറിയാനി ഗ്രന്ഥങ്ങളുടെ കാറ്റലോഗ് തയ്യാറാക്കുക, വിവർത്തനങ്ങൾ പ്രോത്സാഹിപ്പിക്കുക, ഭാവി തലമുറകൾക്കായി ചരിത്രം ഡിജിറ്റലായി സൂക്ഷിക്കുക."
                : "Cataloging West Syriac manuscript fragments, translating liturgies, and safeguarding historical documents using modern design."}
            </p>
          </div>
        </div>
      </section>

      {/* 5. FEATURED RESEARCH SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold-primary">
              {isMl ? "ലേഖനങ്ങൾ & പഠനങ്ങൾ" : "Scholarly Works"}
            </span>
            <h2 className="font-cinzel text-2xl md:text-4xl font-bold text-gold-primary">
              {isMl ? "ഗവേഷണ ശേഖരങ്ങൾ" : "Research & Posts"}
            </h2>
          </div>
          <Link
            href="/archive"
            className="text-xs font-bold text-gold-primary hover:text-gold-light border-b border-gold-primary/20 pb-0.5 flex items-center gap-1 transition-all"
          >
            {isMl ? "എല്ലാ രേഖകളും പരിശോധിക്കുക" : "View Full Archives"} <ArrowRight size={12} />
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col rounded-xl bg-cardElevated border border-gold-primary/5 overflow-hidden shadow-xl hover:border-gold-primary/20 transition-all duration-300 group"
              >
                {post.imageUrl && (
                  <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-gold-primary/10 bg-background">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl}
                      alt={isMl ? post.titleMalayalam : post.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full bg-background/90 backdrop-blur-sm border border-gold-primary/25 text-[9px] font-bold uppercase tracking-wider text-gold-primary">
                      {post.category}
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col gap-4 flex-grow justify-between bg-surface/50">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-mutedText">
                      <Calendar size={11} />
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="font-cinzel text-base font-bold text-parchment group-hover:text-gold-primary transition-colors leading-tight">
                      <Link href={`/posts/${post.slug}`}>{isMl ? post.titleMalayalam : post.title}</Link>
                    </h3>
                    <p className="text-mutedText text-xs leading-relaxed line-clamp-3">
                      {isMl ? post.summaryMalayalam : post.summary}
                    </p>
                  </div>

                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-[10px] font-bold uppercase tracking-wider text-gold-primary hover:text-gold-light flex items-center gap-1 mt-3 transition-colors"
                  >
                    {isMl ? "വായിക്കുക" : "Read Manuscript"} <ArrowRight size={10} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center border border-dashed border-gold-primary/15 rounded-xl bg-surface/30 max-w-md mx-auto flex flex-col items-center gap-3">
            <p className="text-mutedText text-xs">
              No research posts have been published yet. Check back later or configure database seed.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
