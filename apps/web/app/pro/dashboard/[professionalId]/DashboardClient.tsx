"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

type Summary = {
  leadsReceived?: number;
  leadsPurchased?: number;
  conversionRate?: number;
  creditsBalance?: number;
  averageRating?: number;
  ratingCount?: number;
  companyName?: string;
  trade?: string;
  city?: string;
};

type LeadItem = {
  id: string;
  title: string;
  city: string;
  trade: string;
  createdAt: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  status: string;
  contactEmail?: string | null;
  contactPhone?: string | null;
};

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("evaltravaux_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function DashboardClient({ professionalId }: { professionalId: string }) {
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauth, setUnauth] = useState(false);
  const [paymentPending, setPaymentPending] = useState(false);
  const [buyCreditsLoading, setBuyCreditsLoading] = useState<number | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);

  const fetchSummary = () => {
    const headers = getAuthHeaders();
    if (!headers.Authorization) return;
    fetch(`${API_URL}/api/dashboard/professionals/${professionalId}/summary`, { headers })
      .then((res) => {
        if (res.status === 401 || res.status === 403) setUnauth(true);
        return res.ok ? res.json() : null;
      })
      .then(setSummary);

    fetch(`${API_URL}/api/dashboard/professionals/${professionalId}/leads`, { headers })
      .then((res) => {
        if (res.status === 401 || res.status === 403) setUnauth(true);
        return res.ok ? res.json() : null;
      })
      .then((data) => {
        if (Array.isArray(data)) setLeads(data);
      });
  };

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("evaltravaux_token") : null;
    if (!token) {
      setUnauth(true);
      setLoading(false);
      return;
    }
    fetchSummary();
    setLoading(false);
  }, [professionalId]);

  useEffect(() => {
    const payment = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");
    if (payment === "success" && sessionId && !paymentPending) {
      setPaymentPending(true);
      const headers = getAuthHeaders();
      fetch(`${API_URL}/api/credits/confirm-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...headers },
        body: JSON.stringify({ professionalId, sessionId }),
      })
        .then((res) => res.ok && res.json())
        .then(() => {
          fetchSummary();
          window.history.replaceState({}, "", window.location.pathname);
        })
        .finally(() => setPaymentPending(false));
    }
  }, [searchParams, professionalId, paymentPending]);

  const handleLogout = () => {
    localStorage.removeItem("evaltravaux_token");
    localStorage.removeItem("evaltravaux_professionalId");
    window.location.href = "/";
  };

  const handleBuyCredits = async (packSize: 50 | 100 | 200) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const successUrl = `${origin}/pro/dashboard/${professionalId}?payment=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/pro/dashboard/${professionalId}?payment=cancelled`;
    setBuyCreditsLoading(packSize);
    try {
      const res = await fetch(`${API_URL}/api/credits/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          professionalId,
          packSize,
          successUrl,
          cancelUrl,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.url) window.location.href = data.url;
    } finally {
      setBuyCreditsLoading(null);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-50">
        <p className="text-slate-300">Chargement…</p>
      </main>
    );
  }

  if (unauth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-50">
        <div className="space-y-4 text-center">
          <p className="text-sm text-slate-200">
            Vous devez être connecté pour accéder à ce tableau de bord.
          </p>
          <Link
            href="/login"
            className="inline-block rounded-full bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-300 transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex-shrink-0">
              <img src="/logo.png" alt="EvalTravaux" className="h-9 w-auto object-contain drop-shadow-sm" />
            </Link>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                Tableau de bord artisan
              </h1>
              <p className="text-sm text-slate-300">
                {summary?.companyName && `${summary.companyName} – `}
                Vue d’ensemble de vos demandes de devis, crédits et réputation.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400">{professionalId}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-slate-700/70 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-50 hover:border-sky-300 hover:bg-slate-900/80 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="mb-1 text-xs text-slate-400">Leads reçus</p>
            <p className="text-2xl font-bold text-slate-50">{summary?.leadsReceived ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="mb-1 text-xs text-slate-400">Leads achetés</p>
            <p className="text-2xl font-bold text-slate-50">{summary?.leadsPurchased ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="mb-1 text-xs text-slate-400">Taux de conversion</p>
            <p className="text-2xl font-bold text-slate-50">{summary?.conversionRate ?? 0} %</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="mb-1 text-xs text-slate-400">Solde de crédits</p>
            <p className="text-2xl font-bold text-slate-50">{summary?.creditsBalance ?? 0}</p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[2fr,1fr]">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-50">Activité récente</h2>
            <p className="text-xs text-slate-400">
              Graphique d’évolution des leads et revenus (à connecter).
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="text-sm font-semibold text-slate-50">Note moyenne</h2>
            <p className="text-3xl font-bold text-slate-50">
              {summary?.averageRating?.toFixed?.(1) ?? "0,0"}
            </p>
            <p className="text-xs text-slate-400">{summary?.ratingCount ?? 0} avis clients</p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-50">Demandes de devis récentes</h3>
            <p className="text-xs text-slate-400">
              Derniers leads qui vous ont été attribués (ville, budget, statut).
            </p>
            <div className="mt-2 max-h-64 space-y-2 overflow-auto pr-1">
              {leads.length === 0 && (
                <p className="text-xs text-slate-400">Aucune demande récente pour le moment.</p>
              )}
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="line-clamp-1 font-medium text-slate-50">{lead.title}</p>
                    <span className="inline-flex items-center rounded-full bg-sky-400 px-2 py-0.5 text-[10px] font-medium text-slate-950">
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-slate-300">
                    {lead.trade} – {lead.city}
                  </p>
                  <p className="text-slate-300">
                    {lead.budgetMin || lead.budgetMax
                      ? `${(lead.budgetMin ?? 0).toLocaleString("fr-FR")} € – ${(lead.budgetMax ?? 0).toLocaleString("fr-FR")} €`
                      : "Budget non précisé"}
                  </p>
                  {lead.contactEmail && (
                    <p className="break-all text-slate-200">{lead.contactEmail}</p>
                  )}
                  {lead.contactPhone && (
                    <p className="text-slate-200">{lead.contactPhone}</p>
                  )}
                  <p className="text-[10px] text-slate-400">
                    Créé le {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-50">Acheter des crédits</h3>
            <p className="text-xs text-slate-400">
              Au-delà des crédits offerts, achetez des packs (paiement sécurisé).
            </p>
            <div className="flex flex-wrap gap-2">
              {([50, 100, 200] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleBuyCredits(size)}
                  disabled={buyCreditsLoading !== null}
                  className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-medium text-slate-950 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {buyCreditsLoading === size ? "Redirection…" : `${size} cr. (${size === 50 ? "80" : size === 100 ? "140" : "240"} €)`}
                </button>
              ))}
            </div>
            {paymentPending && (
              <p className="text-xs text-slate-400">Enregistrement du paiement…</p>
            )}
          </div>
          <div className="space-y-1 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="text-sm font-semibold text-slate-50">Documents & avis</h3>
            <p className="text-xs text-slate-400">
              Documents réglementaires et avis clients.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
