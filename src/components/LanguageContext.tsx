"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ml";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, ml: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Read from cookie or localStorage on client mount
    const savedLang = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="))
      ?.split("=")[1] as Language | undefined;

    if (savedLang === "en" || savedLang === "ml") {
      setLanguageState(savedLang);
    } else {
      const localLang = localStorage.getItem("lang") as Language | null;
      if (localLang === "en" || localLang === "ml") {
        setLanguageState(localLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    // Write cookie to make it available to Server Components
    document.cookie = `lang=${lang}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Strict`;
  };

  const t = (en: string, ml: string) => {
    return language === "ml" ? ml : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
