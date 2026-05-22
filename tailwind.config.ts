import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-ibm-arabic)", "system-ui", "sans-serif"],
        display: ["var(--font-ibm-arabic)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          mint: "#39D2C0",
          mintLight: "#7FE3D6",
          mintSoft: "#E6FAF7",
          teal: "#073B4A",
          tealDeep: "#04222B",
          tealMid: "#064456",
          ink: "#0A1F26",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "1.25rem",
        md: "1rem",
        sm: "0.75rem",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #39D2C0 0%, #2BBFB0 45%, #0E6E78 100%)",
        "brand-soft":
          "linear-gradient(180deg, #E6FAF7 0%, rgba(230,250,247,0) 100%)",
        "hero-radial":
          "radial-gradient(80% 60% at 50% 0%, rgba(57,210,192,0.18), transparent 70%)",
        "grid-faint":
          "linear-gradient(rgba(57,210,192,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(57,210,192,0.07) 1px, transparent 1px)",
      },
      boxShadow: {
        glass: "0 10px 40px -10px rgba(7,59,74,0.18)",
        brand: "0 18px 50px -18px rgba(57,210,192,0.55)",
        soft: "0 8px 30px -10px rgba(7,59,74,0.10)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
        shine: "shine 3s linear infinite",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
