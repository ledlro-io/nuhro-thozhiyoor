import { Sora, Manrope, Instrument_Serif } from "next/font/google";

// Fonts used on the printed documents. They are exposed as CSS variables
// (--f-sora, --f-man, --f-serif) that studio.css reads.
const sora = Sora({ subsets: ["latin", "latin-ext"], variable: "--f-sora", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--f-man", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: "italic",
  variable: "--f-serif",
  display: "swap",
});

export const studioFontVars = `${sora.variable} ${manrope.variable} ${serif.variable}`;