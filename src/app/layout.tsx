import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DynamicParticles from "@/components/DynamicParticles";
import { LanguageProvider } from "@/components/LanguageContext";

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
  title: "Nuhro Thozhiyoor | Independent Heritage & Research Archive",
  description: "An independent digital archive and museum dedicated to preserving the history, liturgy, ancient manuscripts, and episcopal legacy of the Malabar Independent Syrian Church - Thozhiyoor.",
  keywords: "Thozhiyoor, Malabar Independent Syrian Church, Nuhro, Syriac Christian, Liturgy, Manuscripts, Kerala Church History, Kattumangattu Bavas",
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
      </body>
    </html>
  );
}
