import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicParticles from "@/components/DynamicParticles";
import { LanguageProvider } from "@/components/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuhro-thozhiyoor.vercel.app"),
  title: {
    default: "Nuhro Thozhiyoor | Independent Heritage & Research Archive",
    template: "%s | Nuhro Thozhiyoor",
  },
  description: "An independent digital archive and museum dedicated to preserving the history, liturgy, ancient manuscripts, and episcopal legacy of the Malabar Independent Syrian Church - Thozhiyoor.",
  keywords: [
    "Thozhiyoor",
    "Thozhiyoor Sabha",
    "Malabar Independent Syrian Church",
    "Nuhro",
    "Syriac Christian",
    "Liturgy",
    "Ancient Manuscripts",
    "Kerala Church History",
    "Kattumangattu Bavas",
    "Episcopal Succession",
    "Saint George Cathedral Thozhiyoor"
  ],
  authors: [{ name: "Nuhro Thozhiyoor Digital Heritage Initiative" }],
  creator: "Malabar Independent Syrian Church",
  publisher: "Nuhro Thozhiyoor",
  alternates: {
    canonical: "https://nuhro-thozhiyoor.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuhro-thozhiyoor.vercel.app",
    siteName: "Nuhro Thozhiyoor",
    title: "Nuhro Thozhiyoor | Independent Heritage & Research Archive",
    description: "An independent digital archive and museum dedicated to preserving the history, liturgy, ancient manuscripts, and episcopal legacy of the Malabar Independent Syrian Church - Thozhiyoor.",
    images: [
      {
        url: "https://nuhro-thozhiyoor.vercel.app/logo.jpg",
        width: 800,
        height: 600,
        alt: "Nuhro Thozhiyoor Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuhro Thozhiyoor | Heritage & Research Archive",
    description: "Digital archive preserving the liturgical and episcopal heritage of the Malabar Independent Syrian Church - Thozhiyoor.",
    images: ["https://nuhro-thozhiyoor.vercel.app/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  "name": "Malabar Independent Syrian Church (Thozhiyoor Sabha)",
  "alternateName": "Thozhiyoor Church",
  "url": "https://nuhro-thozhiyoor.vercel.app",
  "logo": "https://nuhro-thozhiyoor.vercel.app/logo.jpg",
  "description": "Historical independent episcopal see of the Saint Thomas Christians established at Thozhiyoor in 1772.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Thozhiyur",
    "addressRegion": "Kerala",
    "postalCode": "680520",
    "addressCountry": "IN"
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nuhro Thozhiyoor",
  "url": "https://nuhro-thozhiyoor.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://nuhro-thozhiyoor.vercel.app/archive?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background text-parchment antialiased min-h-screen flex flex-col justify-between font-jakarta">
        <LanguageProvider>
          {/* Floating background particles */}
          <DynamicParticles />

          {/* Navigation Bar */}
          <Navbar />

          {/* Page Contents */}
          <main className="flex-grow pt-28 pb-16 relative z-10">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </LanguageProvider>
       <Analytics />
      </body>
    </html>
  );
}
