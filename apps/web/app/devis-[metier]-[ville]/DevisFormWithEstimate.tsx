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
  const [budget, setBudget] = useState("5 000 € – 20 000 €");
  const [location, setLocation] = useState(defaultCity);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
          city: cityLabel,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Erreur lors de l’estimation.");
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
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            description,
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
          throw new Error(data.message || "Erreur lors de l’enregistrement de votre demande.");
        }
        setSubmitSuccess("Votre demande de devis a bien été enregistrée. Des artisans qualifiés pourront vous contacter.");
      } catch (e) {
        setSubmitError(
          e instanceof Error
            ? e.message
            : "Erreur inattendue lors de l’envoi de la demande de devis.",
        );
      } finally {
        setSubmitting(false);
      }
    })();
  };

  const hasCoreInfos = description.trim().length > 0 && email.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-700/70 bg-slate-900/80 p-4 text-sm shadow-[0_18px_60px_-30px_rgba(15,23,42,0.9)] backdrop-blur"
    >
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
          1. Description du projet
        </label>
        <textarea
          className="w-full min-h-[110px] rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
          placeholder="Présentez en quelques lignes vos travaux, l’état actuel (avant) et le résultat souhaité (après)…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="text-[11px] text-slate-400">
          Plus votre description est précise (surface, matériaux, contraintes), plus les devis reçus
          seront pertinents.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            2. Type de travaux
          </label>
          <select
            className="w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <option>Rénovation complète</option>
            <option>Rafraîchissement</option>
            <option>Urgence / dépannage</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            3. Surface approximative
          </label>
          <input
            className="w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
            placeholder="Ex : 60"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            4. Budget approximatif
          </label>
          <select
            className="w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option>Moins de 5 000 €</option>
            <option>5 000 € – 20 000 €</option>
            <option>Plus de 20 000 €</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            5. Localisation précise
          </label>
          <input
            className="w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
            placeholder={`Ex : ${cityLabel}`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            6. Vos coordonnées
          </label>
          <input
            className="w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
            type="email"
            required
            placeholder="vous@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            7. Téléphone (facultatif)
          </label>
          <input
            className="w-full rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-50 outline-none ring-0 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/60"
            placeholder="Ex : 06 12 34 56 78"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
          8. Photos (bientôt disponible)
        </label>
        <p className="text-[11px] text-slate-400">
          Zone d’upload à connecter plus tard (JPG, PNG, PDF). Les photos aident à affiner
          l’estimation.
        </p>
      </div>
      <div className="space-y-2">
        <button
          type="button"
          onClick={handleGetEstimate}
          disabled={loading || !hasCoreInfos}
          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Estimation en cours…" : "Obtenir une estimation IA indicative"}
        </button>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {estimate && (
          <div className="space-y-2 rounded-xl border border-slate-700/80 bg-slate-950/70 p-3">
            <p className="font-medium text-slate-50">Estimation indicative</p>
            <ul className="space-y-1 text-sm text-slate-200">
              {estimate.lines.map((line, i) => (
                <li key={i}>
                  {line.label} : {line.amount.toLocaleString("fr-FR")} €
                </li>
              ))}
            </ul>
            <p className="border-t border-slate-700/80 pt-1 font-semibold text-slate-50">
              Total estimatif : {estimate.total.toLocaleString("fr-FR")} €
            </p>
            <p className="text-[11px] text-slate-400">
              Estimation indicative basée sur des données moyennes. Elle ne remplace pas un devis
              détaillé réalisé par un professionnel.
            </p>
          </div>
        )}
        <p className="text-[11px] text-slate-400">
          Estimation indicative basée sur des données moyennes. Elle ne remplace pas un devis
          détaillé réalisé par un professionnel.
        </p>
        {submitError && <p className="text-xs text-red-400">{submitError}</p>}
        {submitSuccess && <p className="text-xs text-emerald-300">{submitSuccess}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition-colors hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Envoi en cours…" : "Envoyer ma demande de devis"}
      </button>
    </form>
  );
}
