import Link from "next/link";

const NAVY = "#0f2b46";
const ORANGE = "#ff7a00";
const CONTAINER_STYLE = { width: "100%", maxWidth: 1400, margin: "0 auto", paddingLeft: 48, paddingRight: 48 };

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
        <div style={{ ...CONTAINER_STYLE, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0" }}>
          <Link href="/">
            <img src="/logo-dark.png" alt="EvalTravaux" style={{ height: 80, width: "auto", objectFit: "contain" }} />
          </Link>
          <nav style={{ display: "flex", gap: 16 }}>
            <Link href="/login" style={{ color: "rgba(255,255,255,0.9)", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 16 }}>Connexion</Link>
            <Link href="/register" style={{ background: ORANGE, color: "#fff", padding: "12px 24px", borderRadius: 10, fontWeight: 600, textDecoration: "none", fontSize: 16 }}>Inscription artisan</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: NAVY, paddingTop: 140, paddingBottom: 80 }}>
        <div style={{ ...CONTAINER_STYLE, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48, justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>
              Comparez plusieurs devis travaux fiables en quelques minutes
            </h1>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", marginTop: 28, maxWidth: 560 }}>
              Décrivez votre projet et recevez rapidement des devis d&apos;artisans qualifiés.
            </p>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: "#fff", padding: "20px 48px", borderRadius: 14, fontWeight: 600, fontSize: 20, marginTop: 28, textDecoration: "none" }}>
              Obtenir mes devis gratuits
            </Link>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 28, marginTop: 28, fontSize: 17, color: "rgba(255,255,255,0.8)" }}>
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
      <section style={{ background: "#fff", padding: "28px 0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ ...CONTAINER_STYLE, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 48 }}>
          {TRUST_SIGNALS.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: NAVY, fontSize: 24 }}>{s.icon}</div>
              <span style={{ fontWeight: 600, color: "#334155", fontSize: 18 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" style={{ padding: "100px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Comment fonctionne EvalTravaux ?
          </h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: 20, maxWidth: 640, marginLeft: "auto", marginRight: "auto", fontSize: 18 }}>
            Un parcours simple en 3 étapes pour obtenir des devis comparables.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, marginTop: 56 }}>
            {[1, 2, 3].map((n, i) => (
              <div key={n} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 40, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: NAVY, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 24, marginBottom: 20 }}>{n}</div>
                <h3 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{["Décrivez votre projet", "Recevez plusieurs devis d'artisans", "Comparez et choisissez le meilleur"][i]}</h3>
                <p style={{ color: "#475569", marginTop: 12, fontSize: 16 }}>{["Quelques questions guidées pour préciser votre besoin.", "Votre demande est transmise aux artisans qualifiés. Réponse sous 24-48h.", "Prix, délais, avis clients : vous gardez la main."][i]}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: "#fff", padding: "20px 48px", borderRadius: 14, fontWeight: 600, fontSize: 20, textDecoration: "none" }}>
              Démarrer ma demande →
            </Link>
          </div>
        </div>
      </section>

      {/* Types de travaux */}
      <section style={{ background: "#f8fafc", padding: "100px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, margin: 0 }}>Types de travaux</h2>
          <p style={{ color: "#475569", marginTop: 20, fontSize: 18 }}>Choisissez le type de travaux qui correspond à votre projet.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24, marginTop: 56 }}>
            {WORK_CATEGORIES.map((cat) => (
              <Link key={cat.label} href={`/devis-${cat.slug}-paris`} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 32, textDecoration: "none", color: "inherit" }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{cat.icon}</div>
                <h3 style={{ marginTop: 20, fontWeight: 600, fontSize: 20 }}>{cat.label}</h3>
                <p style={{ marginTop: 12, fontSize: 16, color: "#64748b" }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section style={{ padding: "100px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, margin: 0 }}>Pourquoi utiliser EvalTravaux ?</h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: 20, fontSize: 18 }}>Des avantages concrets pour simplifier vos projets.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32, marginTop: 56 }}>
            {ADVANTAGES.map((adv) => (
              <div key={adv.title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 20, padding: 36, boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(15,43,70,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: NAVY, fontSize: 28 }}>{adv.icon}</div>
                <h3 style={{ marginTop: 20, fontWeight: 600, fontSize: 20 }}>{adv.title}</h3>
                <p style={{ marginTop: 12, fontSize: 16, color: "#475569" }}>{adv.desc}</p>
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
      <section style={{ background: NAVY, padding: "100px 0" }}>
        <div style={CONTAINER_STYLE}>
          <div style={{ maxWidth: 700, margin: "0 auto", background: "#fff", borderRadius: 20, padding: 56, textAlign: "center", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>Recevez vos devis travaux gratuitement</h2>
            <p style={{ color: "#475569", marginTop: 20, fontSize: 18 }}>Décrivez votre projet et recevez rapidement des devis comparables.</p>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: "#fff", padding: "20px 48px", borderRadius: 14, fontWeight: 600, fontSize: 20, marginTop: 28, textDecoration: "none" }}>
              Demander mes devis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: NAVY, color: "#fff", padding: "64px 0 32px" }}>
        <div style={{ ...CONTAINER_STYLE, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 48 }}>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>EvalTravaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
              <li style={{ marginBottom: 8 }}><Link href="#comment-ca-marche" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Comment ça marche</Link></li>
              <li style={{ marginBottom: 8 }}><Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>Travaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
              <li style={{ marginBottom: 8 }}><Link href="/devis-plombier-paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Plomberie</Link></li>
              <li style={{ marginBottom: 8 }}><Link href="/devis-renovation-paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Rénovation</Link></li>
              <li style={{ marginBottom: 8 }}><Link href="/devis-menuisier-paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Cuisine</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
              <li style={{ marginBottom: 8 }}><Link href="/mentions-legales" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Mentions légales</Link></li>
              <li style={{ marginBottom: 8 }}><Link href="/politique-confidentialite" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Politique de confidentialité</Link></li>
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
