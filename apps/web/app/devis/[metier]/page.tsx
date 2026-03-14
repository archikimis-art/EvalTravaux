import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SEO_TRADES } from "../../../config/seo";
import { DevisFormWithEstimate } from "../DevisFormWithEstimate";

type Params = {
  params: Promise<{ metier: string }>;
};

/** ISR : revalider toutes les heures */
export const revalidate = 3600;

/** Pages statiques pour chaque métier (sans ville fixée) */
export function generateStaticParams() {
  return SEO_TRADES.map((metier) => ({ metier }));
}

function getTradeLabel(metier: string): string | null {
  const t = metier?.trim().toLowerCase() || "";
  if (!t || !SEO_TRADES.includes(t as (typeof SEO_TRADES)[number])) return null;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { metier } = await params;
  const tradeLabel = getTradeLabel(metier);
  if (!tradeLabel) {
    return {
      title: "Demande de devis travaux – EvalTravaux",
      description: "Demandez un devis travaux et trouvez des artisans qualifiés près de chez vous.",
    };
  }

  return {
    title: `Devis ${tradeLabel} – EvalTravaux`,
    description: `Demandez gratuitement des devis de ${tradeLabel.toLowerCase()} près de chez vous. Indiquez votre ville et recevez des offres d'artisans qualifiés.`,
  };
}

export default async function DevisMetierPage({ params }: Params) {
  const { metier } = await params;
  const tradeLabel = getTradeLabel(metier);
  if (!tradeLabel) return notFound();

  const trade = metier.toLowerCase();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-8 md:px-12 lg:px-16 py-10 space-y-8">
        <header className="space-y-4">
          <Link href="/" className="inline-block">
            <Image src="/logo.png" alt="EvalTravaux" width={560} height={168} className="w-auto object-contain" style={{ height: 168 }} />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Devis {tradeLabel} – Indiquez votre ville
          </h1>
          <p className="text-sm text-slate-600">
            Décrivez vos travaux et indiquez votre localisation dans le formulaire. Vous recevrez des devis
            d&apos;artisans {tradeLabel.toLowerCase()} qualifiés près de chez vous.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-[3fr,2fr] items-start">
          <div className="space-y-5">
            <article className="space-y-3">
              <h2 className="text-lg font-semibold">
                {tradeLabel} : comment ça marche ?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                EvalTravaux vous met en relation avec des artisans{" "}
                {tradeLabel.toLowerCase()} sélectionnés dans votre zone. Un seul formulaire suffit pour
                décrire vos travaux et indiquer votre localisation. Vous comparez ensuite plusieurs
                devis en toute simplicité.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Après votre demande, votre projet est transmis à des artisans {tradeLabel.toLowerCase()}{" "}
                pertinents à proximité de chez vous, en fonction de leur zone d&apos;intervention et de leur historique
                de qualité. Vous discutez ensuite directement avec eux pour affiner le devis.
              </p>
            </article>

            <article className="space-y-2">
              <h3 className="text-sm font-semibold">Prix moyens constatés</h3>
              <p className="text-xs text-slate-600">
                Les montants ci-dessous sont indicatifs et peuvent varier selon l&apos;état du bien, les
                matériaux choisis et l&apos;accessibilité du chantier.
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
                <li>Indiquez précisément votre ville ou commune dans le formulaire.</li>
              </ul>
            </article>

            <section className="mt-4 space-y-3 max-w-2xl">
              <h2 className="text-lg font-semibold">Demande de devis {tradeLabel}</h2>
              <DevisFormWithEstimate
                tradeLabel={tradeLabel}
                cityLabel=""
                defaultCity=""
              />
            </section>
          </div>

          <aside className="space-y-4">
            <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm text-sm space-y-2">
              <h2 className="text-sm font-semibold">Artisans {tradeLabel.toLowerCase()} près de chez vous</h2>
              <p className="text-xs text-slate-600">
                EvalTravaux sélectionne des artisans {tradeLabel.toLowerCase()} à proximité de votre localisation
                en vérifiant leurs documents réglementaires (assurance, Kbis, RGE le cas échéant) et leurs
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
