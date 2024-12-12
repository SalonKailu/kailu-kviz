import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--background)",
          dark: "var(--background)",  // změněno na stejnou hodnotu
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          dark: "var(--foreground)",  // změněno na stejnou hodnotu
        },
      },
    },
  },
  // darkMode: 'media',  // Odstraníme nebo zakomentujeme tuto řádku
  plugins: [],
} satisfies Config;