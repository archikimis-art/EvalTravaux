import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="relative overflow-hidden">
        {/* Bandeau de fond */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-br from-sky-500 via-slate-900 to-slate-950" />

        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="EvalTravaux"
                  width={170}
                  height={48}
                  priority
                  className="h-9 w-auto object-contain drop-shadow-sm"
                />
              </Link>
              <p className="hidden max-w-xs text-xs text-slate-100/80 sm:block">
                Plateforme professionnelle de demandes de devis travaux, avec artisans vérifiés et
                estimation indicative par IA.
              </p>
            </div>

            <nav className="flex items-center gap-3 text-xs font-medium">
              <Link
                href="/login"
                className="rounded-full border border-slate-500/70 bg-slate-900/60 px-3 py-1.5 text-slate-50 hover:border-sky-400 hover:bg-slate-900 transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-sky-400 px-3.5 py-1.5 text-slate-950 shadow-sm hover:bg-sky-300 transition-colors"
              >
                Inscription artisan
              </Link>
            </nav>
          </header>

          {/* Contenu principal */}
          <div className="grid flex-1 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:items-center">
            {/* Colonne gauche : Hero + CTA */}
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-950/40 px-3 py-1 text-[11px] font-medium text-sky-100 shadow-sm backdrop-blur">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Devis gratuits et sans engagement
              </div>

              <div className="space-y-4">
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Obtenez plusieurs devis travaux{" "}
                  <span className="bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
                    fiables et comparables
                  </span>
                  .
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-slate-100/80 sm:text-base">
                  Décrivez votre projet en quelques questions, recevez une estimation indicative
                  générée par IA puis comparez les offres d’artisans qualifiés près de chez vous.
                </p>
              </div>

              {/* CTA principaux */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/devis-plombier-paris"
                  className="inline-flex items-center justify-center rounded-full bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-300 transition-colors"
                >
                  Demander un devis travaux
                </Link>
                <Link
                  href="#fonctionnement"
                  className="inline-flex items-center justify-center rounded-full border border-slate-500/60 bg-slate-900/40 px-5 py-2 text-sm font-medium text-slate-50 hover:border-sky-300 hover:bg-slate-900 transition-colors"
                >
                  Comment ça marche ?
                </Link>
                <p className="w-full text-xs text-slate-200/80 sm:w-auto">
                  Réponse moyenne sous 24 à 48h ouvrées.
                </p>
              </div>

              {/* Réassurances */}
              <div className="grid gap-3 text-xs text-slate-100/80 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 py-3">
                  <p className="font-semibold text-slate-50">Artisans vérifiés</p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Dossiers vérifiés manuellement et avis clients contrôlés.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 py-3">
                  <p className="font-semibold text-slate-50">Devis comparables</p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Un même brief pour des offres structurées de façon homogène.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-900/50 px-3 py-3">
                  <p className="font-semibold text-slate-50">Gratuit & sans engagement</p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    Vous choisissez l’artisan qui vous convient, ou aucun.
                  </p>
                </div>
              </div>
            </section>

            {/* Colonne droite : bloc estimation / aperçu interface */}
            <section className="mt-2 lg:mt-0">
              <div className="rounded-2xl border border-sky-100/10 bg-slate-900/70 p-4 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-300">
                      Aperçu estimation IA
                    </p>
                    <p className="mt-1 text-xs text-slate-300">
                      Exemple pour un projet de rénovation d’appartement.
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    Simulation indicative
                  </span>
                </div>

                <div className="space-y-3 rounded-xl border border-slate-700/80 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Budget estimé</span>
                    <span className="font-semibold text-slate-50">18 000 € – 24 000 € TTC</span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div className="absolute inset-y-0 left-[5%] right-[30%] rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Fourchette calculée selon des projets similaires. Le prix final dépendra des
                    devis détaillés de chaque artisan.
                  </p>
                </div>

                <div className="mt-4 grid gap-3 text-xs text-slate-100/90 sm:grid-cols-2">
                  <div className="space-y-2 rounded-xl border border-slate-700/80 bg-slate-950/60 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      Étapes de votre projet
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                        <span>Brief précis de votre besoin en quelques questions ciblées.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>Analyse automatique par IA et qualification de votre demande.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-sky-200" />
                        <span>Transmission aux artisans partenaires les plus adaptés.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 rounded-xl border border-slate-700/80 bg-slate-950/60 p-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      Exemple de devis reçus
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border border-slate-700/80 bg-slate-900/60 px-2.5 py-1.5">
                        <span className="text-[11px] text-slate-200">Artisan A • Paris 11e</span>
                        <span className="text-[11px] font-semibold text-sky-300">19 200 €</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-2.5 py-1.5">
                        <span className="text-[11px] text-slate-200">Artisan B • Montreuil</span>
                        <span className="text-[11px] font-semibold text-sky-200">21 800 €</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-2.5 py-1.5">
                        <span className="text-[11px] text-slate-200">Artisan C • Saint-Denis</span>
                        <span className="text-[11px] font-semibold text-slate-100">23 500 €</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Section fonctionnement */}
          <section
            id="fonctionnement"
            className="mt-14 grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-6 sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-50">
                Comment fonctionne EvalTravaux ?
              </h2>
              <p className="text-sm text-slate-300">
                Notre objectif : vous permettre de comparer des devis réellement comparables, en
                toute transparence, avec des artisans sérieux.
              </p>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Étape 1
                </p>
                <p className="mt-1.5 font-medium text-slate-50">Vous décrivez votre projet</p>
                <p className="mt-1 text-xs text-slate-300">
                  Quelques questions guidées pour préciser votre besoin, vos délais et votre budget.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Étape 2
                </p>
                <p className="mt-1.5 font-medium text-slate-50">
                  Nous qualifions et transmettons votre demande
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  Analyse automatique, vérification manuelle lorsque nécessaire, puis envoi aux
                  artisans les plus adaptés.
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Étape 3
                </p>
                <p className="mt-1.5 font-medium text-slate-50">Vous comparez les devis reçus</p>
                <p className="mt-1 text-xs text-slate-300">
                  Prix, délais, avis clients, détails de prestation : vous gardez la main sur le
                  choix final.
                </p>
              </div>
            </div>
          </section>

          {/* Exemples de pages devis locales */}
          <section className="mt-10">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Exemples de pages devis locales
                </h3>
                <p className="mt-1 text-xs text-slate-300">
                  Inspirez-vous des parcours les plus demandés sur la plateforme.
                </p>
              </div>
              <Link
                href="/devis-renovation-marseille"
                className="hidden text-xs font-medium text-sky-300 hover:text-sky-200 sm:inline-flex"
              >
                Voir un exemple complet
              </Link>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-3">
              <Link
                href="/devis-plombier-paris"
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 hover:border-sky-400/70 hover:bg-slate-950/90 transition-colors"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    Plomberie
                  </p>
                  <p className="mt-1 font-semibold text-slate-50">Devis plombier à Paris</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Fuite, salle de bains, chauffe-eau : comparez plusieurs propositions.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-medium text-sky-300 group-hover:text-sky-200">
                  Lancer ma demande →
                </span>
              </Link>

              <Link
                href="/devis-electricien-lyon"
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 hover:border-sky-400/70 hover:bg-slate-950/90 transition-colors"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    Électricité
                  </p>
                  <p className="mt-1 font-semibold text-slate-50">Devis électricien à Lyon</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Mise aux normes, tableau électrique, rénovation complète.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-medium text-sky-300 group-hover:text-sky-200">
                  Lancer ma demande →
                </span>
              </Link>

              <Link
                href="/devis-renovation-marseille"
                className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/70 p-3 hover:border-sky-400/70 hover:bg-slate-950/90 transition-colors"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    Rénovation globale
                  </p>
                  <p className="mt-1 font-semibold text-slate-50">
                    Devis rénovation appartement à Marseille
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Idéal pour un projet incluant plusieurs corps de métier.
                  </p>
                </div>
                <span className="mt-3 text-[11px] font-medium text-sky-300 group-hover:text-sky-200">
                  Lancer ma demande →
                </span>
              </Link>
            </div>
          </section>

          {/* Footer simple */}
          <footer className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-5 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} EvalTravaux. Tous droits réservés.</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link href="/mentions-legales" className="hover:text-slate-200">
                Mentions légales
              </Link>
              <Link href="/cgu" className="hover:text-slate-200">
                CGU
              </Link>
              <Link href="/pro" className="hover:text-slate-200">
                Espace artisans
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
