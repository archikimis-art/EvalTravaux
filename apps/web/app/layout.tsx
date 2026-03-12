import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EvalTravaux – Marketplace travaux",
  description:
    "Demandez des devis travaux, comparez les artisans et obtenez une estimation indicative grâce à l’IA.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased transition-colors duration-300">
        {props.children}
      </body>
    </html>
  );
}
