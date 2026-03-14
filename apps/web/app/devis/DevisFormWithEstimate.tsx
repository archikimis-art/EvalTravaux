"use client";

import { useState } from "react";

export type EstimateLine = { label: string; amount: number };
export type EstimateResult = { lines: EstimateLine[]; total: number };

type Props = {
  tradeLabel: string;
  cityLabel: string;
  defaultCity: string;
};

export function DevisFormWithEstimate({ tradeLabel, cityLabel, defaultCity }: Props) {
  const [description, setDescription] = useState("");
  const [workType, setWorkType] = useState("Rénovation complète");
  const [surface, setSurface] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [budget, setBudget] = useState("5 000 € – 20 000 €");
  const [location, setLocation] = useState(defaultCity);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleGetEstimate = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          workType,
          surface: surface ? parseInt(surface, 10) : undefined,
          budget,
          trade: tradeLabel.toLowerCase(),
          city: location || cityLabel,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Erreur lors de l'estimation.");
      }
      const data: EstimateResult = await res.json();
      setEstimate(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void (async () => {
      setSubmitError(null);
      setSubmitSuccess(null);
      setSubmitting(true);
      try {
        let descToSend = description;
        if (workType === "Rénovation complète" && (surface || numberOfRooms)) {
          const parts: string[] = [];
          if (surface) parts.push(`Surface du logement : ${surface} m²`);
          if (numberOfRooms) parts.push(`Nombre de pièces : ${numberOfRooms}`);
          descToSend = parts.join(". ") + (description.trim() ? "\n\n" + description : "");
        }
        if (comments.trim()) {
          descToSend += (descToSend ? "\n\n" : "") + "Commentaires : " + comments.trim();
        }
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description: descToSend,
            workType,
            surface: surface ? parseInt(surface, 10) : undefined,
            budget,
            trade: tradeLabel.toLowerCase(),
            city: location || cityLabel,
            email,
            phone,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || "Erreur lors de l'enregistrement de votre demande.");
        }
        setSubmitSuccess("Votre demande de devis a bien été enregistrée. Des artisans qualifiés pourront vous contacter.");
      } catch (e) {
        setSubmitError(
          e instanceof Error
            ? e.message
            : "Erreur inattendue lors de l'envoi de la demande de devis.",
        );
      } finally {
        setSubmitting(false);
      }
    })();
  };

  const hasCoreInfos = description.trim().length > 0 && email.trim().length > 0 && (cityLabel || location.trim().length > 0);

  const isRénovationGlobale = workType === "Rénovation complète";
  const isSurfaceWalls = ["peintre", "plâtrier", "plastrier"].includes(tradeLabel.toLowerCase());
  const surfaceLabel = isRénovationGlobale
    ? "Surface du logement (m²)"
    : "Surface à traiter (m²)";
  const surfaceHint = isRénovationGlobale
    ? "Surface plancher au sol du logement."
    : isSurfaceWalls
      ? "Surface des murs, plafonds et/ou sols à peindre ou enduire."
      : "Surface plancher au sol pour la plupart des travaux. Pour peinture ou enduit : surface des murs et plafonds à traiter.";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border-2 border-orange-200/60 bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 p-6 md:p-8 text-sm shadow-xl shadow-orange-200/20"
    >
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-orange-200/60 pb-2">Votre projet</h3>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            1. Description du projet
          </label>
          <textarea
          className="w-full min-h-[120px] rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
          placeholder="Présentez en quelques lignes vos travaux, l'état actuel (avant) et le résultat souhaité (après)…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
          <p className="text-xs text-slate-500 italic">
          Plus votre description est précise (surface, matériaux, contraintes), plus les devis reçus
          seront pertinents.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-orange-200/60 pb-2">Caractéristiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            2. Type de travaux
          </label>
          <select
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <option>Rénovation complète</option>
            <option>Rafraîchissement</option>
            <option>Urgence / dépannage</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            3. {surfaceLabel}
          </label>
          <input
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
            placeholder={isSurfaceWalls ? "Ex : 45 (murs + plafonds)" : isRénovationGlobale ? "Ex : 65" : "Ex : 60 (surface au sol)"}
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
          />
          <p className="text-xs text-slate-500 italic">{surfaceHint}</p>
        </div>
        {isRénovationGlobale && (
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-800">
              4. Nombre de pièces
            </label>
            <input
              className="w-full max-w-xs rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
              placeholder="Ex : 4 (salon, cuisine, 2 chambres)"
              value={numberOfRooms}
              onChange={(e) => setNumberOfRooms(e.target.value)}
            />
            <p className="text-xs text-slate-500 italic">Nombre de pièces du logement (hors entrée, WC séparé, etc.).</p>
          </div>
        )}
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-orange-200/60 pb-2">Localisation et budget</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            {isRénovationGlobale ? "5" : "4"}. Budget approximatif
          </label>
          <select
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>Moins de 5 000 €</option>
            <option>5 000 € – 20 000 €</option>
            <option>Plus de 20 000 €</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            {isRénovationGlobale ? "6" : "5"}. Localisation précise
          </label>
          <input
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
            placeholder={cityLabel ? `Ex : ${cityLabel}` : "Ex : Paris, Lyon, Marseille..."}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required={!cityLabel}
          />
        </div>
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-orange-200/60 pb-2">Coordonnées</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            {isRénovationGlobale ? "7" : "6"}. Vos coordonnées
          </label>
          <input
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
            type="email"
            required
            placeholder="vous@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            {isRénovationGlobale ? "8" : "7"}. Téléphone (facultatif)
          </label>
          <input
            className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
            placeholder="Ex : 06 12 34 56 78"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-orange-200/60 pb-2">Compléments</h3>
        <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            {isRénovationGlobale ? "9" : "8"}. Commentaires (facultatif)
        </label>
        <textarea
          className="w-full min-h-[80px] rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none ring-0 placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-colors"
          placeholder="Tout commentaire ou précision supplémentaire sur votre projet…"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-800">
            {isRénovationGlobale ? "10" : "9"}. Photos (bientôt disponible)
        </label>
        <p className="text-xs text-slate-500 italic">
          Zone d'upload à connecter plus tard (JPG, PNG, PDF). Les photos aident à affiner
          l'estimation.
          </p>
        </div>
        </div>
      </section>
      <div className="space-y-4 pt-2">
        <button
          type="button"
          onClick={handleGetEstimate}
          disabled={loading || !hasCoreInfos}
          className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 transition-all hover:bg-emerald-600 hover:shadow-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Estimation en cours…" : "Obtenir une estimation IA indicative"}
        </button>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {estimate && (
          <div className="space-y-2 rounded-xl border-2 border-emerald-200 bg-emerald-50/80 p-4">
            <p className="font-medium text-slate-50">Estimation indicative</p>
            <ul className="space-y-1 text-sm text-slate-200">
              {estimate.lines.map((line, i) => (
                <li key={i}>
                  {line.label} : {line.amount.toLocaleString("fr-FR")} €
                </li>
              ))}
            </ul>
            <p className="border-t border-emerald-200 pt-2 font-semibold text-emerald-800">
              Total estimatif : {estimate.total.toLocaleString("fr-FR")} €
            </p>
            <p className="text-xs text-slate-600">
              Estimation indicative basée sur des données moyennes. Elle ne remplace pas un devis
              détaillé réalisé par un professionnel.
            </p>
          </div>
        )}
        <p className="text-xs text-slate-600">
          Estimation indicative basée sur des données moyennes. Elle ne remplace pas un devis
          détaillé réalisé par un professionnel.
        </p>
        {submitError && <p className="text-xs text-red-400">{submitError}</p>}
        {submitSuccess && <p className="text-xs text-emerald-300">{submitSuccess}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/40 transition-all hover:bg-orange-600 hover:shadow-orange-500/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Envoi en cours…" : "Envoyer ma demande de devis"}
      </button>
    </form>
  );
}
