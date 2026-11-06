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
    title: "Consecration of Abraham Mar Koorilose I",
    description:
      "Mar Gregorios Yuhanna, Metropolitan of Jerusalem, consecrates Abraham Kattumangattu Ramban as the 1st Metropolitan of the MISC. This establishes the unbroken West Syrian episcopal succession that defines the Church to this day.",
    icon: <Shield size={16} />,
  },
  {
    year: "c.1788",
    title: "The See Established at Thozhiyur",
    description:
      "Mar Koorilose I withdraws northward and establishes his cathedral at Thozhiyur — a jurisdiction free from rival hierarchies. St George's Cathedral is built, becoming the enduring heart of the MISC.",
    icon: <Star size={16} />,
  },
  {
    year: "1794",
    title: "Consecration of Geevarghese Mar Koorilose II",
    description:
      "To secure the apostolic succession, Abraham Mar Koorilose I consecrates his own brother Geevarghese as the 2nd Metropolitan. Known as the Kattumangattu Bavas, these brothers lay the permanent canonical foundation of the MISC.",
    icon: <BookOpen size={16} />,
  },
  {
    year: "c.1802",
    title: "Mar Koorilose II Ascends the Throne",
    description:
      "On the repose of Abraham Mar Koorilose I, Geevarghese Mar Koorilose II becomes the sole Metropolitan. He stabilises Church properties, consolidates diocesan independence, and nurtures relations with British administrators.",
    icon: <Clock size={16} />,
  },
  {
    year: "1811",
    title: "First Consecration for the Malankara Church",
    description:
      "The MISC consecrates a bishop for the Malankara Church during a grave succession crisis — inaugurating what Fenwick calls the 'Mission of Help.' The MISC gives bishops freely without seeking jurisdiction, a unique act of ecclesial generosity.",
    icon: <Heart size={16} />,
  },
  {
    year: "c.1816–1829",
    title: "The Golden Age: Mar Philoxenos I & II",
    description:
      "Geeverghese Mar Philoxenos I (3rd Metropolitan) and Geeverghese Mar Philoxenos II (4th Metropolitan) preside over the MISC. Fenwick describes the era of Mar Philoxenos II as the 'Golden Age' of the MISC's service to the wider Syrian Church of Kerala.",
    icon: <Star size={16} />,
  },
  {
    year: "1836",
    title: "The Mavelikara Synod",
    description:
      "A landmark assembly in Kerala's Syrian Church history. The MISC under Geevarghese Mar Koorilose III (5th Metropolitan, 1829–1856) stands apart, preserving the undiluted West Syrian Orthodox rite and canonical integrity of the founding Metropolitans.",
    icon: <BookOpen size={16} />,
  },
  {
    year: "1856",
    title: "Joseph Mar Koorilose IV — Era of Expansion",
    description:
      "Joseph Mar Koorilose IV (Alathoor-Panakkal), 6th Metropolitan (1856–1888), leads the most active period of MISC growth — building schools, constructing the cloister adjoining St George's Cathedral, and extending the Church beyond Anjur and Thozhiyur.",
    icon: <Shield size={16} />,
  },
  {
    year: "1894",
    title: "Consecration of Titus I Mar Thoma",
    description:
      "Joseph Mar Athanasios I (7th Metropolitan, 1888–1898) presides at the consecration of Titus I Mar Thoma at the Cheriapally, Kottayam — an act that preserves the Mar Thoma Syrian Church's episcopal succession, cementing the MISC's historic role as keeper of the episcopal line.",
    icon: <Heart size={16} />,
  },
  {
    year: "1898",
    title: "Geevarghese Mar Koorilose V",
    description:
      "Geevarghese Mar Koorilose V (Pulikkottil-Karumamkuzhi), 8th Metropolitan, begins a 37-year tenure — the longest in MISC history. He guides the Church through the modern era, oversees legal validation of Church properties, and consecrates a Suffragan in 1917.",
    icon: <Star size={16} />,
  },
  {
    year: "1936",
    title: "Kuriakose Mar Koorilose VI",
    description:
      "Kuriakose Mar Koorilose VI (Koothoor), 9th Metropolitan (1936–1947), is consecrated by Titus II Mar Thoma — the Mar Thoma Church now returning the gift of episcopal consecration that the MISC had given it decades before.",
    icon: <Clock size={16} />,
  },
  {
    year: "1948",
    title: "Geeverghese Mar Koorilose VII",
    description:
      "Geeverghese Mar Koorilose VII (Cheeran), 10th Metropolitan (1948–1967), is consecrated by Juhanon Mar Thoma. The MISC Visitors' Book — begun in 1868 — continues its record of distinguished guests and canonical events through his tenure.",
    icon: <BookOpen size={16} />,
  },
  {
    year: "1967",
    title: "Paulose Mar Philoxenos III & Mathews Mar Koorilose VIII",
    description:
      "Paulose Mar Philoxenos III (11th Metropolitan, 1967–1977) and Mathews Mar Koorilose VIII (12th Metropolitan, 1977–1986) preside over a period of renewed identity. ",
    icon: <Shield size={16} />,
  },
  {
    year: "1986",
    title: "Joseph Mar Koorilose IX",
    description:
      "Joseph Mar Koorilose IX (Alathoor-Panakkal), 13th Metropolitan (1986–2001), is consecrated by Alexander Mar Thoma. He becomes the first MISC Metropolitan to travel internationally, forging ecumenical links with the Malankara Churches and Syriac Orthodox Church and beyond.The MISC Support Group is established in the UK, bringing Thozhiyur to international attention.",
    icon: <Star size={16} />,
  },
  {
    year: "2001",
    title: "Cyril Mar Basilios — Into the New Century",
    description:
      "Cyril Mar Basilios (Koothoor), 14th Metropolitan, is consecrated by Mar Koorilose IX. He pioneers the digitisation of ancient Syriac manuscripts at Thozhiyur, expands educational institutions, and carries a 250-year unbroken tradition into the 21st century.",
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
