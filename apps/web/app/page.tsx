import Link from "next/link";

const NAVY = "#0f2b46";
const ORANGE = "#ff7a00";
const CONTAINER_STYLE = { width: "100%", maxWidth: "100%", margin: 0, paddingLeft: 40, paddingRight: 40, boxSizing: "border-box" };

const WORK_CATEGORIES = [
  { label: "Plomberie", slug: "plombier", icon: "🔧", desc: "Fuite, chauffe-eau, salle de bains" },
  { label: "Électricité", slug: "electricien", icon: "💡", desc: "Mise aux normes, tableau électrique" },
  { label: "Rénovation", slug: "renovation", icon: "🏠", desc: "Appartement, maison complète" },
  { label: "Salle de bain", slug: "plombier", icon: "🛁", desc: "Carrelage, douche, sanitaires" },
  { label: "Cuisine", slug: "menuisier", icon: "🍳", desc: "Aménagement, plans de travail" },
  { label: "Isolation", slug: "renovation", icon: "🧱", desc: "Thermique, phonique, combles" },
  { label: "Peinture", slug: "peintre", icon: "🎨", desc: "Intérieur, extérieur, décoration" },
  { label: "Chauffage", slug: "chauffagiste", icon: "🔥", desc: "Chaudière, radiateurs, pompe à chaleur" },
];

const TRUST_SIGNALS = [
  { label: "Artisans vérifiés", icon: "✓" },
  { label: "Devis gratuits", icon: "€" },
  { label: "Réponse rapide", icon: "⚡" },
  { label: "Plateforme sécurisée", icon: "🛡" },
];

const ADVANTAGES = [
  { title: "Devis gratuits", desc: "Aucun frais pour les particuliers", icon: "€" },
  { title: "Artisans vérifiés", desc: "Documents et avis contrôlés", icon: "🛡" },
  { title: "Comparaison simple", desc: "Offres structurées et comparables", icon: "📄" },
  { title: "Gain de temps", desc: "Réponse sous 24-48h ouvrées", icon: "⏱" },
];

const TESTIMONIALS = [
  { name: "Marie L.", city: "Lyon", text: "J'ai reçu 4 devis en 48h. Très pratique pour comparer les prix." },
  { name: "Thomas D.", city: "Paris", text: "Service fluide et professionnel. Mon plombier a été réactif." },
  { name: "Sophie M.", city: "Bordeaux", text: "Enfin une plateforme sérieuse ! Les artisans sont vérifiés." },
];

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: NAVY, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ ...CONTAINER_STYLE, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0" }}>
          <Link href="/">
            <img src="/logo-dark.png" alt="EvalTravaux" style={{ height: 560, width: "auto", objectFit: "contain" }} />
          </Link>
          <nav style={{ display: "flex", gap: 12 }}>
            <Link href="/login" style={{ color: "rgba(255,255,255,0.9)", padding: "8px 16px", borderRadius: 8, textDecoration: "none" }}>Connexion</Link>
            <Link href="/register" style={{ background: ORANGE, color: "#fff", padding: "8px 16px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>Inscription artisan</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: NAVY, paddingTop: 620, paddingBottom: 80 }}>
        <div style={{ ...CONTAINER_STYLE, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48, justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>
              Comparez plusieurs devis travaux fiables en quelques minutes
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.9)", marginTop: 24, maxWidth: 500 }}>
              Décrivez votre projet et recevez rapidement des devis d&apos;artisans qualifiés.
            </p>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 600, fontSize: 18, marginTop: 24, textDecoration: "none" }}>
              Obtenir mes devis gratuits
            </Link>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginTop: 24, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
              <span>✓ Devis gratuits</span>
              <span>✓ Artisans vérifiés</span>
              <span>✓ Sans engagement</span>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 16, justifyContent: "center" }}>
            <span style={{ fontSize: 64 }}>🏠</span>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span style={{ background: "rgba(255,255,255,0.1)", padding: "8px 16px", borderRadius: 8, color: "#fff", fontSize: 14 }}>✓ Checklist</span>
              <span style={{ fontSize: 48 }}>👷</span>
            </div>
            <span style={{ fontSize: 48, color: ORANGE }}>✓</span>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section style={{ background: "#fff", padding: "16px 0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ ...CONTAINER_STYLE, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
          {TRUST_SIGNALS.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: NAVY }}>{s.icon}</div>
              <span style={{ fontWeight: 500, color: "#334155" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" style={{ padding: "80px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Comment fonctionne EvalTravaux ?
          </h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: 16, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
            Un parcours simple en 3 étapes pour obtenir des devis comparables.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, marginTop: 48 }}>
            {[1, 2, 3].map((n, i) => (
              <div key={n} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: NAVY, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, marginBottom: 16 }}>{n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{["Décrivez votre projet", "Recevez plusieurs devis d'artisans", "Comparez et choisissez le meilleur"][i]}</h3>
                <p style={{ color: "#475569", marginTop: 8, fontSize: 14 }}>{["Quelques questions guidées pour préciser votre besoin.", "Votre demande est transmise aux artisans qualifiés. Réponse sous 24-48h.", "Prix, délais, avis clients : vous gardez la main."][i]}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 600, fontSize: 18, textDecoration: "none" }}>
              Démarrer ma demande →
            </Link>
          </div>
        </div>
      </section>

      {/* Types de travaux */}
      <section style={{ background: "#f8fafc", padding: "80px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, margin: 0 }}>Types de travaux</h2>
          <p style={{ color: "#475569", marginTop: 16 }}>Choisissez le type de travaux qui correspond à votre projet.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginTop: 48 }}>
            {WORK_CATEGORIES.map((cat) => (
              <Link key={cat.label} href={`/devis-${cat.slug}-paris`} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, textDecoration: "none", color: "inherit" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{cat.icon}</div>
                <h3 style={{ marginTop: 16, fontWeight: 600 }}>{cat.label}</h3>
                <p style={{ marginTop: 8, fontSize: 14, color: "#64748b" }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section style={{ padding: "80px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, margin: 0 }}>Pourquoi utiliser EvalTravaux ?</h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: 16 }}>Des avantages concrets pour simplifier vos projets.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, marginTop: 48 }}>
            {ADVANTAGES.map((adv) => (
              <div key={adv.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: NAVY }}>{adv.icon}</div>
                <h3 style={{ marginTop: 16, fontWeight: 600 }}>{adv.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14, color: "#475569" }}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section style={{ padding: "80px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, margin: 0 }}>Ce que disent nos utilisateurs</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, marginTop: 48 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ color: ORANGE }}>★★★★★</div>
                <p style={{ color: "#475569", marginTop: 16 }}>&ldquo;{t.text}&rdquo;</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: NAVY }}>{t.name[0]}</div>
                  <div>
                    <p style={{ fontWeight: 600, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ background: NAVY, padding: "80px 0" }}>
        <div style={CONTAINER_STYLE}>
          <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 16, padding: 40, textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
            <h2 style={{ fontSize: "clamp(1.25rem, 2vw, 1.875rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>Recevez vos devis travaux gratuitement</h2>
            <p style={{ color: "#475569", marginTop: 16 }}>Décrivez votre projet et recevez rapidement des devis comparables.</p>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 600, fontSize: 18, marginTop: 24, textDecoration: "none" }}>
              Demander mes devis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: NAVY, color: "#fff", padding: "64px 0 32px" }}>
        <div style={{ ...CONTAINER_STYLE, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 48 }}>
          <div>
            <img src="/logo-dark.png" alt="EvalTravaux" style={{ height: 480, width: "auto", objectFit: "contain" }} />
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0 }}>EvalTravaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
              <li><Link href="#comment-ca-marche" style={{ color: "#94a3b8", textDecoration: "none" }}>Comment ça marche</Link></li>
              <li><Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0 }}>Travaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
              <li><Link href="/devis-plombier-paris" style={{ color: "#94a3b8", textDecoration: "none" }}>Plomberie</Link></li>
              <li><Link href="/devis-renovation-paris" style={{ color: "#94a3b8", textDecoration: "none" }}>Rénovation</Link></li>
              <li><Link href="/devis-menuisier-paris" style={{ color: "#94a3b8", textDecoration: "none" }}>Cuisine</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0 }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
              <li><Link href="/mentions-legales" style={{ color: "#94a3b8", textDecoration: "none" }}>Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" style={{ color: "#94a3b8", textDecoration: "none" }}>Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 14, marginTop: 48, paddingTop: 32, borderTop: "1px solid #334155" }}>
          © {new Date().getFullYear()} EvalTravaux. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
