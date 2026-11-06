import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b12",
        surface: "#101018",
        cardElevated: "#171723",
        gold: {
          light: "#f0d5a3",
          primary: "#e2b56f",
          secondary: "#cfa24f",
          dark: "#a37a34",
        },
        parchment: "#f5f2ea",
        mutedText: "#a5a5b5",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "serif"],
        cormorant: ["var(--font-cormorant)", "serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "gold-glow": "0 0 15px rgba(226, 181, 111, 0.12)",
        "gold-glow-lg": "0 0 35px rgba(226, 181, 111, 0.22)",
      },
    },
  },
  plugins: [],
};
export default config;
