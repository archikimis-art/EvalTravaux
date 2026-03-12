"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CUSTOMER" | "PROFESSIONAL">("CUSTOMER");
  const [companyName, setCompanyName] = useState("");
  const [trade, setTrade] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (role === "PROFESSIONAL" && (!companyName.trim() || !trade.trim() || !city.trim())) {
      setError("Raison sociale, métier et ville sont obligatoires pour les professionnels.");
      return;
    }
    setLoading(true);
    try {
      const body: Record<string, unknown> = { email, password, role };
      if (role === "PROFESSIONAL") {
        body.companyName = companyName.trim();
        body.trade = trade.trim();
        body.city = city.trim();
      }
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Erreur lors de l’inscription.");
        return;
      }
      if (data.access_token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("evaltravaux_token", data.access_token);
          if (data.professionalId) {
            localStorage.setItem("evaltravaux_professionalId", data.professionalId);
          }
        }
        if (data.professionalId) {
          router.push(`/pro/dashboard/${data.professionalId}`);
        } else {
          router.push("/");
        }
      }
    } catch {
      setError("Erreur de connexion. Vérifiez que l’API est démarrée.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <img src="/logo.png" alt="EvalTravaux" className="h-10 w-auto mx-auto object-contain" />
          </Link>
          <h1 className="mt-4 text-lg font-semibold">Inscription</h1>
          <p className="text-sm text-slate-600 mt-1">
            Créez un compte particulier ou professionnel.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="vous@exemple.fr"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profil</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "CUSTOMER" | "PROFESSIONAL")}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="CUSTOMER">Particulier (demander des devis)</option>
              <option value="PROFESSIONAL">Professionnel (recevoir des leads)</option>
            </select>
          </div>

          {role === "PROFESSIONAL" && (
            <>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">
                  Raison sociale
                </label>
                <input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex : SARL Dupont Rénovation"
                />
              </div>
              <div>
                <label htmlFor="trade" className="block text-sm font-medium text-slate-700 mb-1">
                  Métier
                </label>
                <input
                  id="trade"
                  value={trade}
                  onChange={(e) => setTrade(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex : plombier, électricien"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
                  Ville
                </label>
                <input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex : Paris"
                />
              </div>
            </>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-semibold py-2.5 text-sm transition-colors"
          >
            {loading ? "Inscription…" : "S’inscrire"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-medium text-emerald-600 hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}
