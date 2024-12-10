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
          dark: "var(--background-dark)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          dark: "var(--foreground-dark)",
        },
      },
    },
  },
  darkMode: 'media', // Přidáme toto pro automatickou detekci tmavého režimu
  plugins: [],
} satisfies Config;
