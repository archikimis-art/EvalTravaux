/**
 * Liste des métiers et villes pour les pages SEO /devis-[metier]-[ville].
 * À étendre pour Cities × Trades (ex. 200 villes × 40 métiers).
 */
export const SEO_TRADES = [
  "plombier",
  "electricien",
  "renovation",
  "peintre",
  "macon",
  "couvreur",
  "carreleur",
  "menuisier",
  "chauffagiste",
  "serrurier",
  "plaquiste",
  "plâtrier",
  "terrassier",
  "paysagiste",
  "architecte",
] as const;

export const SEO_CITIES = [
  "paris",
  "lyon",
  "marseille",
  "lille",
  "bordeaux",
  "toulouse",
  "nice",
  "nantes",
  "strasbourg",
  "montpellier",
  "rennes",
  "grenoble",
  "dijon",
  "angers",
] as const;

export type SeoTrade = (typeof SEO_TRADES)[number];
export type SeoCity = (typeof SEO_CITIES)[number];

/** Génère tous les slugs metier-ville pour generateStaticParams (ISR). */
export function getDevisSlugs(): { "metier-ville": string }[] {
  const slugs: { "metier-ville": string }[] = [];
  for (const trade of SEO_TRADES) {
    for (const city of SEO_CITIES) {
      slugs.push({ "metier-ville": `${trade}-${city}` });
    }
  }
  return slugs;
}
