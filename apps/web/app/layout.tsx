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
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body style={{ margin: 0, minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
        {props.children}
      </body>
    </html>
  );
}
