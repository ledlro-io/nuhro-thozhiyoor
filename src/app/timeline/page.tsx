import React from "react";
import { Clock, Shield, Star, BookOpen, Heart } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1772",
    title: "The Consecration at Chickkara",
    description: "Mar Gregorios, Metropolitan from the Syriac Orthodox Patriarchate of Jerusalem, consecrates Kattumangattu Abraham Ramban as Metropolitan Abraham Mar Koorilose I. This establishes his episcopal authority.",
    icon: <Shield size={16} />,
  },
  {
    year: "1789",
    title: "Establishment of the Thozhiyoor See",
    description: "Driven by canonical conflicts, Mar Koorilose withdraws to Thozhiyoor, an independent enclave under British rule. Here, he establishes the Cathedral and independent diocese, free from local state jurisdictions.",
    icon: <Star size={16} />,
  },
  {
    year: "1794",
    title: "Securing Succession",
    description: "To safeguard the independent line, Abraham Mar Koorilose consecrates his brother Geevarghese Mar Koorilose II. The siblings become known in church records as the Kattumangattu Bavas.",
    icon: <BookOpen size={16} />,
  },
  {
    year: "1802",
    title: "Ascension of the Younger Bava",
    description: "Upon the passing of Abraham Mar Koorilose, Geevarghese Mar Koorilose II ascends as the Second Metropolitan, stabilizing properties and relations with British administrators.",
    icon: <Clock size={16} />,
  },
  {
    year: "1811",
    title: "Fraternal Consecrations begin",
    description: "The Thozhiyoor Church consecrates bishops for the Malankara Church during major succession crises, establishing a precedent of serving sister churches without exercising control over them.",
    icon: <Heart size={16} />,
  },
  {
    year: "1856",
    title: "Era of Joseph Mar Koorilose",
    description: "Consecration of Joseph Mar Koorilose, beginning a stable 32-year reign characterized by expansion, building schools, and structural diocese organization.",
    icon: <Shield size={16} />,
  },
  {
    year: "1898",
    title: "Karumamkuzhi Pulikkottil Metropolitan",
    description: "Geevarghese Mar Koorilose (Pulikkottil) ascends the throne, presiding for 37 years and managing the church through modern transitions and legal validations.",
    icon: <Star size={16} />,
  },
  {
    year: "2001",
    title: "Current Era: Cyril Mar Baselios I",
    description: "Cyril Mar Baselios I is consecrated. He pioneers the digitisation of classical Syriac manuscripts, upgrades public educational establishments, and fosters active ecumenical dialogue.",
    icon: <Shield size={16} />,
  },
];

export default function TimelinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-3 text-center">
        <span className="text-xs uppercase font-bold tracking-widest text-gold-primary">Canonical History</span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gold-primary">Heritage Timeline</h1>
        <p className="text-mutedText max-w-xl mx-auto text-sm leading-relaxed mt-1">
          Trace the historical path, canonical milestones, and sovereign timeline of the Malabar Independent Syrian Church of Thozhiyoor.
        </p>
        <div className="w-20 h-0.5 bg-gold-primary/30 mx-auto mt-4" />
      </div>

      {/* Timeline Tree */}
      <div className="relative border-l-2 border-gold-primary/20 pl-6 md:pl-10 ml-4 md:ml-8 my-8 flex flex-col gap-12">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative group">
            {/* Timeline Dot with Ring */}
            <div className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-background border border-gold-primary/40 flex items-center justify-center text-gold-primary shadow-gold-glow group-hover:bg-gold-primary group-hover:text-background transition-all duration-500 z-10">
              {event.icon}
            </div>

            {/* Content card */}
            <div className="p-6 md:p-8 rounded-xl bg-surface border border-gold-primary/5 hover:border-gold-primary/20 transition-all duration-300 shadow-xl flex flex-col gap-3 manuscript-border">
              {/* Year tag */}
              <span className="text-sm font-mono font-bold text-gold-primary bg-gold-primary/5 border border-gold-primary/20 px-3 py-1 rounded w-fit">
                {event.year}
              </span>
              
              <h3 className="font-playfair text-xl md:text-2xl font-bold text-parchment group-hover:text-gold-primary transition-colors">
                {event.title}
              </h3>
              
              <p className="text-mutedText text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
