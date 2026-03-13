import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  safelist: [
    "bg-brand-navy",
    "bg-brand-navy/95",
    "bg-brand-navy/10",
    "bg-brand-orange",
    "text-brand-navy",
    "text-brand-orange",
    "bg-brand-orange-hover",
    "hover:bg-brand-orange-hover",
    "max-w-container",
    "min-h-screen",
    "bg-white",
    "text-slate-900",
    "text-slate-600",
    "text-slate-500",
    "text-slate-400",
    "bg-slate-50",
    "bg-slate-200",
    "border-slate-200",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0f2b46",
          orange: "#ff7a00",
          "orange-hover": "#e66d00",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
