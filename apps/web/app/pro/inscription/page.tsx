"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SEO_TRADES } from "../../../config/seo";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const TRADE_LABELS: Record<string, string> = {
  plombier: "Plomberie",
  electricien: "Électricité",
  renovation: "Rénovation",
  peintre: "Peinture",
  macon: "Maçonnerie",
  couvreur: "Couvreur",
  carreleur: "Carrelage",
  menuisier: "Menuiserie",
  chauffagiste: "Chauffage",
  serrurier: "Serrurerie",
  plaquiste: "Plaquiste",
  "plâtrier": "Plâtrerie",
  terrassier: "Terrassement",
  paysagiste: "Paysagiste",
  architecte: "Architecture",
};

const EMPLOYEE_OPTIONS = [
  "Sans salarié",
  "1 à 2",
  "3 à 5",
  "6 à 10",
  "Plus de 10",
];

export default function ProInscriptionPage() {
  const router = useRouter();
  const [activity, setActivity] = useState("plombier");
  const [postalCode, setPostalCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [employees, setEmployees] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cgu, setCgu] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!cgu) {
      setError("Vous devez accepter les Conditions Générales d'Utilisation.");
      return;
    }
    if (!companyName.trim() || !firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError("Tous les champs obligatoires doivent être renseignés.");
      return;
    }
    const city = postalCode.trim() ? postalCode.trim() : "À préciser";
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role: "PROFESSIONAL",
          companyName: companyName.trim(),
          trade: activity,
          city,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Erreur lors de l'inscription.");
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
      setError("Erreur de connexion. Vérifiez que le service est disponible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left panel - Form */}
        <div className="flex-1 bg-sky-50/80 p-6 md:p-10 lg:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            <Link href="/" className="inline-block mb-6">
              <Image src="/logo.png" alt="EvalTravaux" width={560} height={168} className="w-auto object-contain" style={{ height: 168 }} />
            </Link>
            <p className="text-xs text-slate-500 mb-6">Tous les champs marqués * sont obligatoires</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Votre activité principale *</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                  required
                >
                  {SEO_TRADES.map((t) => (
                    <option key={t} value={t}>
                      {TRADE_LABELS[t] || t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Ville ou code postal *</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                  placeholder="Ex : Paris ou 75001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Nom de votre société *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                  placeholder="Ex : SARL Dupont Rénovation"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Nombre de salariés</label>
                <select
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                >
                  <option value="">Sélectionnez</option>
                  {EMPLOYEE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">Votre prénom *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                    placeholder="Prénom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">Votre nom *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Votre numéro de téléphone</label>
                <div className="flex rounded-xl border-2 border-slate-200 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-orange-400/30 focus-within:border-orange-400">
                  <span className="flex items-center px-4 bg-slate-50 text-slate-600 text-sm font-medium">+33</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 text-slate-800 outline-none"
                    placeholder="6 12 34 56 78"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Votre e-mail *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                  placeholder="contact@votresociete.fr"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Mot de passe *</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cgu}
                    onChange={(e) => setCgu(e.target.checked)}
                    className="mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-sm text-slate-700">
                    J&apos;ai lu et j&apos;accepte les{" "}
                    <Link href="/mentions-legales" className="text-orange-600 font-medium hover:underline">
                      Conditions Générales d&apos;Utilisation
                    </Link>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-sm text-slate-700">
                    Je profite des conseils et bons plans d&apos;EvalTravaux
                  </span>
                </label>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold py-4 text-base shadow-lg shadow-orange-500/30 transition-colors"
              >
                {loading ? "Inscription en cours…" : "Je m'inscris !"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
              Déjà un compte ?{" "}
              <Link href="/login" className="font-semibold text-orange-600 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>

        {/* Right panel - Benefits */}
        <div className="flex-1 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Inscrivez-vous gratuitement
            </h1>
            <p className="mt-4 text-slate-600">
              Recevez des demandes de devis en fonction de votre métier et de votre zone géographique.
            </p>
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">✓</span>
                <div>
                  <p className="font-semibold text-slate-800">Des chantiers qualifiés</p>
                  <p className="text-sm text-slate-600">Tous nos projets sont validés avant d&apos;être transmis aux artisans.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold">○</span>
                <div>
                  <p className="font-semibold text-slate-800">De la souplesse</p>
                  <p className="text-sm text-slate-600">Répondez à autant de chantiers que vous souhaitez, quand vous le souhaitez.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">+</span>
                <div>
                  <p className="font-semibold text-slate-800">Des services pour développer votre activité</p>
                  <p className="text-sm text-slate-600">Mise en avant, crédits devis et accompagnement.</p>
                </div>
              </li>
            </ul>
            <div className="mt-12 p-6 bg-slate-50 rounded-2xl">
              <p className="text-sm font-semibold text-slate-800">Nos professionnels témoignent</p>
              <blockquote className="mt-2 text-sm text-slate-600 italic">
                &quot;EvalTravaux m&apos;a permis de recevoir des demandes qualifiées dans ma zone. La simplicité du service et la rapidité des réponses font la différence.&quot;
              </blockquote>
              <p className="mt-2 text-xs text-slate-500">— Artisan partenaire</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer stats */}
      <footer className="bg-slate-800 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-orange-400">+</p>
            <p className="mt-1 text-sm text-slate-300">Professionnels nous font confiance</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">+</p>
            <p className="mt-1 text-sm text-slate-300">Demandes de devis par an</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">✓</p>
            <p className="mt-1 text-sm text-slate-300">Mise en relation artisans / particuliers</p>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-400">
          Une question ? Consultez notre{" "}
          <Link href="/contact" className="text-orange-400 hover:underline">page contact</Link>.
        </p>
      </footer>
    </main>
  );
}
