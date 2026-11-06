import React from "react";
import { cookies } from "next/headers";
import { Sun, Feather, Eye, AlertCircle } from "lucide-react";
import Separator from "@/components/Separator";

export default function AboutPage() {
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const isMl = lang === "ml";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col gap-14 text-parchment font-jakarta">
      {/* Page Header */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">
          {isMl ? "സഭാ ചരിത്രരചന" : "Ecclesial Historiography"}
        </span>
        <h1 className="font-cinzel text-3xl md:text-5xl font-bold text-gold-primary">
          {isMl ? "നൂഹ്റോ തൊഴിയൂരിനെക്കുറിച്ച്" : "About Nuhro Thozhiyoor"}
        </h1>
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-primary to-transparent mx-auto mt-2" />
      </div>

      {/* Triad Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Meaning of Nuhro */}
        <div className="p-6 rounded-xl bg-surface border border-gold-primary/10 flex flex-col gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-gold-primary">
            <Sun size={18} />
            <h3 className="font-cinzel text-sm font-bold tracking-wide">
              {isMl ? "നൂഹ്റോയുടെ അർത്ഥം" : "Meaning of Nuhro"}
            </h3>
          </div>
          <p className="text-mutedText text-xs md:text-sm leading-relaxed">
            {isMl
              ? "പുരാതന സുറിയാനി ഭാഷയിൽ നൂഹ്റോ എന്നാൽ വെളിച്ചം എന്നാണ് അർത്ഥം. വിസ്മൃതിയിലായ ഓർമ്മകളെയും ചരിത്ര സത്യങ്ങളെയും വെളിച്ചത്തിലേക്ക് കൊണ്ടുവരിക എന്നതാണ് ഈ പ്രസ്ഥാനം ഉദ്ദേശിക്കുന്നത്."
              : "In the ancient Syriac tongue, Nuhro (ܢܘܗܪܐ) translates to Light. For this initiative, it represents the illumination of memory and historic truth, scattering forgotten shadows."}
          </p>
        </div>

        {/* Nature of Archive */}
        <div className="p-6 rounded-xl bg-surface border border-gold-primary/10 flex flex-col gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-gold-primary">
            <Eye size={18} />
            <h3 className="font-cinzel text-sm font-bold tracking-wide">
              {isMl ? "സംരംഭത്തിന്റെ പശ്ചാത്തലം" : "Nature of Archive"}
            </h3>
          </div>
          <p className="text-mutedText text-xs md:text-sm leading-relaxed">
            {isMl
              ? "തൊഴിയൂർ സഭയുടെ ചരിത്രം രേഖപ്പെടുത്തുന്നതിനുള്ള തികച്ചും സ്വതന്ത്രമായ പഠന പ്ലാറ്റ്‌ഫോമാണിത്. സഭയുടെ ഔദ്യോഗിക ഭരണ സമിതികളുമായി ഇതിന് കാനോനിക ബന്ധമില്ല."
              : "This project is a non-official, independent digital heritage archive and museum. It is not owned or sponsored by the official administrative council of the MISC."}
          </p>
        </div>

        {/* Mission */}
        <div className="p-6 rounded-xl bg-surface border border-gold-primary/10 flex flex-col gap-4 shadow-lg">
          <div className="flex items-center gap-3 text-gold-primary">
            <Feather size={18} />
            <h3 className="font-cinzel text-sm font-bold tracking-wide">
              {isMl ? "ഞങ്ങളുടെ ദൗത്യം" : "Our Mission"}
            </h3>
          </div>
          <p className="text-mutedText text-xs md:text-sm leading-relaxed">
            {isMl
              ? "ആരാധനാക്രമങ്ങൾ, പഴയ താലിയോലകൾ, ചരിത്രപരമായ വിവരണങ്ങൾ എന്നിവ ഡിജിറ്റലായി കാറ്റലോഗ് ചെയ്യുകയും ആധുനിക സാങ്കേതികവിദ്യയിലൂടെ സംരക്ഷിക്കുകയും ചെയ്യുക."
              : "Our mission is to catalogue, translate, and safeguard ancient West Syriac liturgies, palm-leaf files, and oral narratives, making them accessible via modern design."}
          </p>
        </div>
      </div>

      {/* Deep-dive Historical Narrative */}
      <section className="relative rounded-xl bg-surface/50 border border-gold-primary/10 p-8 md:p-12 leading-relaxed flex flex-col gap-6 manuscript-border shadow-xl">
        <h2 className="font-cinzel text-xl md:text-2xl text-gold-primary font-bold">
          {isMl ? "ചരിത്ര പശ്ചാത്തലം: തൊഴിയൂർ സിംഹാസനം" : "Historical Foundations: The See of Thozhiyoor"}
        </h2>
        <div className="w-12 h-[1px] bg-gold-primary/30" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs md:text-sm text-mutedText leading-relaxed">
          <div className="flex flex-col gap-4">
            <p>
              {isMl
                ? "മലബാർ സ്വതന്ത്ര സുറിയാനി സഭയുടെ ചരിത്രം എന്നത് സഭയുടെ സ്വയംഭരണത്തിനായുള്ള പോരാട്ടങ്ങളുടെയും സുറിയാനി ആരാധനാ പാരമ്പര്യം കറപുരളാതെ സംരക്ഷിച്ചതിന്റെയും കഥയാണ്. കേരളത്തിലെ നസ്രാണി സഭാ ചരിത്രത്തിലെ സവിശേഷമായ അധ്യായമാണ് കുന്നംകുളത്തിനടുത്തുള്ള തൊഴിയൂർ കേന്ദ്രമായുള്ള ഈ സഭയ്ക്കുള്ളത്."
                : "The history of the Malabar Independent Syrian Church represents one of the most compelling narratives of liturgical preservation in India. Established in the late 18th century, the church has survived as a sovereign, self-governing body within the Saint Thomas Christian tradition."}
            </p>
            <p>
              {isMl
                ? "ഇതിന്റെ ആരംഭം കുറിക്കുന്നത് 1772-ൽ ആണ്. യെരൂശലേമിലെ സുറിയാനി ഓർത്തഡോക്സ് മെത്രാപ്പോലീത്തയായിരുന്ന മാർ ഗ്രിഗോറിയോസ് കേരളത്തിൽ വരികയും കുന്നംകുളത്തെ ചിറക്കൽ പള്ളിയിൽ വെച്ച് കാട്ടുമങ്ങാട്ട് അബ്രഹാം റമ്പാനെ 'അബ്രഹാം മാർ കൂറിലോസ്' എന്ന പേരിൽ മെത്രാനായി അഭിഷേകം ചെയ്യുകയും ചെയ്തു. തുടർന്നുണ്ടായ ആഭ്യന്തര തർക്കങ്ങളെത്തുടർന്ന് അദ്ദേഹത്തിന് കൊച്ചി രാജാവിൽ നിന്നും കടുത്ത എതിർപ്പുകൾ നേരിടേണ്ടി വന്നു."
                : "The origins trace back to 1772, when Metropolitan Mar Gregorios of Jerusalem arrived in Kerala. He consecrated Kattumangattu Abraham Ramban as Metropolitan Abraham Mar Koorilose I. However, due to political disputes, Mar Koorilose faced severe opposition from the state authorities and the contemporary Malankara Metropolitan."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p>
              {isMl
                ? "തുടർന്ന് കൊച്ചി രാജ്യത്തിന് വെളിയിലുള്ള, ബ്രിട്ടീഷ് മലബാറിന്റെ പരിധിയിലുള്ള തൊഴിയൂർ എന്ന കൊച്ചു ഗ്രാമത്തിലേക്ക് അദ്ദേഹം പിൻവാങ്ങി. 1789-ൽ അദ്ദേഹം അവിടെ പള്ളിയും ആസ്ഥാനവും സ്ഥാപിച്ച് സഭയുടെ സ്വാതന്ത്ര്യം പ്രഖ്യാപിച്ചു. കഠിനമായ ജീവിതസാഹചര്യങ്ങൾക്കിടയിലും കാനോനിക പിന്തുടർച്ച വിട്ടുവീഴ്ചയില്ലാതെ നിലനിർത്താൻ സഭയ്ക്ക് കഴിഞ്ഞു."
                : "Seeking sanctuary outside the Cochin state, Mar Koorilose withdrew to Thozhiyoor, an independent enclave under British rule. Here, in 1789, he set up the cathedral, a rectory, and declared the See. This village became a sanctuary of liturgical autonomy, preserving West Syriac theology."}
            </p>
            <p>
              {isMl
                ? "സംഖ്യാപരമായി ചെറുതാണെങ്കിലും ചരിത്രപരമായ പ്രധാന്യം സഭയ്ക്കുണ്ട്. മലങ്കര സഭയിൽ മെത്രാൻ വാഴ്ച പ്രതിസന്ധിയിലായ ചരിത്രത്തിലെ നിർണ്ണായക ഘട്ടങ്ങളിൽ കാനോനികമായി തൊഴിയൂർ മെത്രാപ്പോലീത്തമാർ മറ്റ് സിസ്റ്റർ സഭകൾക്കായി മെത്രാൻമാരെ വാഴിച്ച് നൽകി സഹായിച്ചിട്ടുണ്ട്. അത് പരസ്പര സ്നേഹത്തിന്റെയും സഭാ ഐക്യത്തിന്റെയും മകുടോദാഹരണമാണ്."
                : "Despite its small size, the Thozhiyoor See has played a vital role in Malankara church history. It has repeatedly stepped in to consecrate bishops for other major Syrian churches when their succession lines were threatened, demonstrating a legacy of fraternal ecumenical support."}
            </p>
          </div>
        </div>
      </section>

      {/* Decorative Ornate Separator */}
      <Separator />

      {/* Liturgical Heritage Highlight */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-cardElevated/40 border border-gold-primary/5 rounded-xl p-8 shadow-md">
        <div className="md:col-span-2 flex flex-col gap-4">
          <h3 className="font-cinzel text-lg md:text-xl text-gold-primary font-semibold">
            {isMl ? "ആരാധനാക്രമ പാരമ്പര്യം" : "Liturgical Integrity"}
          </h3>
          <p className="text-mutedText text-xs md:text-sm leading-relaxed">
            {isMl
              ? "പരിശുദ്ധ യാക്കോബിന്റെ തക്സ അടിസ്ഥാനമാക്കിയുള്ള വെസ്റ്റ് സുറിയാനി ആരാധനാക്രമമാണ് സഭ പിന്തുടരുന്നത്. കന്യക മറിയമിന്റെ ഓർമ്മപ്രാർത്ഥനകൾ, സങ്കീർത്തനങ്ങൾ, വിവിധ പ്രാർത്ഥനകൾ എന്നിവ പുരാതന രാഗങ്ങളിൽ പാടിപ്പോരുന്നു. പുരാതന സുറിയാനി കൈയെഴുത്തുപ്രതികൾ വിവർത്തനം ചെയ്യുക എന്നതാണ് ആർക്കൈവ് പ്രധാനമായും ലക്ഷ്യമിടുന്നത്."
              : "The church faithfully maintains the West Syriac Liturgy of Saint James. Our archive projects aim to catalogue the hymnals, liturgical scrolls, and prayer rubrics written in Classical Syriac, which have been passed down through generations since the Kattumangattu Bavas."}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="p-4 border border-gold-primary/20 rounded-full bg-gold-primary/5 text-gold-primary animate-float">
            <span className="font-cinzel text-xl font-bold tracking-widest px-2">ܢܘܗܪܐ</span>
          </div>
        </div>
      </section>

      {/* Disclaimer Box */}
      <div className="flex gap-4 p-5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-mutedText leading-relaxed">
        <AlertCircle size={20} className="text-gold-primary flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-gold-primary block mb-0.5">
            {isMl ? "സഭാഭരണപരമായ അറിയിപ്പ്" : "Notice on Independence"}
          </span>
          {isMl
            ? "ഈ സംരംഭം പൂർണ്ണമായും ചരിത്രപരവും പഠനപരവുമായ ആവശ്യങ്ങൾക്ക് വേണ്ടിയുള്ളതാണ്. ഇത് സഭയുടെ ഔദ്യോഗിക അറിയിപ്പുകൾക്കോ ഇടവക രേഖകൾക്കോ പകരമുള്ളതല്ല. കാനോനിക കാര്യങ്ങൾക്കായി ഭദ്രാസന ആസ്ഥാനവുമായി ബന്ധപ്പെടുക."
            : "Please note that this digital initiative is strictly academic and historical. We operate independently of the ecclesiastical administrators of the Thozhiyur Church. For official canonical matters or parish records, please contact the Church authorities."}
        </div>
      </div>
    </div>
  );
}
