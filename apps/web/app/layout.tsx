import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "EvalTravaux – Marketplace travaux",
  description:
    "Demandez des devis travaux, comparez les artisans et obtenez une estimation indicative grâce à l’IA.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f2b46" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css?v=3" />
      </head>
      <body style={{ margin: 0, minHeight: "100vh", fontFamily: "'Poppins', system-ui, sans-serif" }}>
        {props.children}
      </body>
    </html>
  );
}
