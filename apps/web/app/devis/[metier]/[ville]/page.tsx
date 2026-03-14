import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDevisSlugs } from "../../../../config/seo";
import { DevisFormWithEstimate } from "../../DevisFormWithEstimate";

type Params = {
  params: Promise<{ metier: string; ville: string }>;
};

/** ISR : revalider les pages devis toutes les heures */
export const revalidate = 3600;

/** Génération statique des pages devis (métiers × villes) pour le SEO. */
export function generateStaticParams() {
  return getDevisSlugs().map((s) => {
    const parts = s["metier-ville"].split("-");
    const metier = parts[0] ?? "";
    const ville = parts.slice(1).join("-") || "";
    return { metier, ville };
  });
}

function decodeSlug(metier: string, ville: string): { trade: string; city: string } | null {
  const t = metier?.trim() || "";
  const v = ville?.trim() || "";
  if (!t || !v) return null;
  return { trade: t, city: v.replace(/-/g, " ") };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metier, ville } = await params;
  const decoded = decodeSlug(metier, ville);
  if (!decoded) {
    return {
      title: "Demande de devis travaux – EvalTravaux",
      description: "Demandez un devis travaux et trouvez des artisans qualifiés près de chez vous.",
    };
  }

  const tradeLabel = decoded.trade.charAt(0).toUpperCase() + decoded.trade.slice(1);
  const cityLabel = decoded.city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `Devis ${tradeLabel} ${cityLabel} – EvalTravaux`,
    description: `Demandez gratuitement des devis de ${tradeLabel.toLowerCase()} à ${cityLabel} et comparez des artisans notés par de vrais clients.`,
  };
}

export default async function SeoDevisPage({ params }: Params) {
  const { metier, ville } = await params;
  const decoded = decodeSlug(metier, ville);
  if (!decoded) return notFound();

  const trade = decoded.trade.toLowerCase();
  const city = decoded.city.toLowerCase().replace(/\s/g, "-");

  const tradeLabel = trade.charAt(0).toUpperCase() + trade.slice(1);
  const cityLabel = decoded.city.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-4">
          <Link href="/" className="inline-block">
            <Image src="/logo.png" alt="EvalTravaux" width={140} height={42} className="h-9 w-auto object-contain" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Devis {tradeLabel} à {cityLabel}
          </h1>
          <p className="text-sm text-slate-600">
            Décrivez vos travaux, obtenez une estimation indicative grâce à l&apos;IA et recevez des devis
            d&apos;artisans {tradeLabel.toLowerCase()} qualifiés à {cityLabel}.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-[3fr,2fr] items-start">
          <div className="space-y-5">
            <article className="space-y-3">
              <h2 className="text-lg font-semibold">
                {tradeLabel} à {cityLabel} : comment ça marche ?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                EvalTravaux vous met en relation avec des artisans{" "}
                {tradeLabel.toLowerCase()} sélectionnés à {cityLabel}. Un seul formulaire suffit pour
                décrire vos travaux ({tradeLabel.toLowerCase()}, surface, budget) et comparer plusieurs
                devis en toute simplicité.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Après votre demande, votre projet est transmis à un petit nombre d&apos;artisans {tradeLabel.toLowerCase()}{" "}
                pertinents à {cityLabel}, en fonction de leur zone d&apos;intervention et de leur historique
                de qualité. Vous discutez ensuite directement avec eux pour affiner le devis.
              </p>
            </article>

            <article className="space-y-2">
              <h3 className="text-sm font-semibold">Prix moyens constatés</h3>
              <p className="text-xs text-slate-600">
                Les montants ci-dessous sont indicatifs et peuvent varier selon l&apos;état du bien, les
                matériaux choisis et l&apos;accessibilité du chantier à {cityLabel}.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li>• Petits travaux de {tradeLabel.toLowerCase()} : 150 € – 800 €</li>
                <li>• Intervention courante : 800 € – 3 000 €</li>
                <li>• Rénovation complète : 10 000 € – 40 000 €+</li>
              </ul>
            </article>

            <article className="space-y-3">
              <h3 className="text-sm font-semibold">Conseils pour votre projet</h3>
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                <li>Précisez la surface, l&apos;état existant et le niveau de finition souhaité.</li>
                <li>Joignez des photos claires des pièces ou de la façade.</li>
                <li>Indiquez vos contraintes de délais ou d&apos;occupation des lieux.</li>
                <li>Indiquez si le bien se situe dans le centre de {cityLabel} ou en périphérie.</li>
              </ul>
            </article>

            <section className="mt-4 space-y-3">
              <h2 className="text-lg font-semibold">Demande de devis {tradeLabel}</h2>
              <DevisFormWithEstimate
                tradeLabel={tradeLabel}
                cityLabel={cityLabel}
                defaultCity={cityLabel}
              />
            </section>
          </div>

          <aside className="space-y-4">
            <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-sm space-y-2">
              <h2 className="text-sm font-semibold">Artisans {tradeLabel.toLowerCase()} à {cityLabel}</h2>
              <p className="text-xs text-slate-600">
                EvalTravaux sélectionne des artisans {tradeLabel.toLowerCase()} à {cityLabel} en
                vérifiant leurs documents réglementaires (assurance, Kbis, RGE le cas échéant) et leurs
                avis clients. Vous recevez uniquement des devis d&apos;entreprises réellement actives dans
                votre zone.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-sm space-y-2">
              <h3 className="text-sm font-semibold">FAQ</h3>
              <details className="group border-b border-slate-100 py-1">
                <summary className="cursor-pointer text-xs font-medium text-slate-800">
                  Le service EvalTravaux est-il gratuit pour les particuliers ?
                </summary>
                <p className="mt-1 text-xs text-slate-600">
                  Oui, la demande de devis est gratuite pour les particuliers. Seuls les artisans
                  paient pour accéder aux coordonnées des leads.
                </p>
              </details>
              <details className="group border-b border-slate-100 py-1">
                <summary className="cursor-pointer text-xs font-medium text-slate-800">
                  Combien de devis vais-je recevoir ?
                </summary>
                <p className="mt-1 text-xs text-slate-600">
                  Votre demande est envoyée à un maximum de 5 artisans disponibles et pertinents
                  dans votre zone.
                </p>
              </details>
              <details className="group py-1">
                <summary className="cursor-pointer text-xs font-medium text-slate-800">
                  Comment sont sélectionnés les artisans ?
                </summary>
                <p className="mt-1 text-xs text-slate-600">
                  Les artisans sont notés par de vrais clients et doivent fournir leurs documents
                  réglementaires (assurance, Kbis, RGE…).
                </p>
              </details>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
