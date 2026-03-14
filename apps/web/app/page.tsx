import Link from "next/link";

const NAVY = "#0f2b46";
const ORANGE = "#ff8c00";
const WHITE = "#ffffff";
const PX = 80; // px-20 équivalent (80px)
const PX_LG = 120; // padding horizontal généreux
const CONTAINER_STYLE = {
  width: "100%",
  maxWidth: 1440,
  margin: "0 auto",
  paddingLeft: PX,
  paddingRight: PX,
};

const WORK_CATEGORIES = [
  { label: "Plomberie", slug: "plombier", icon: "🔧", desc: "Fuite, chauffe-eau, salle de bains" },
  { label: "Électricité", slug: "electricien", icon: "💡", desc: "Mise aux normes, tableau électrique" },
  { label: "Rénovation", slug: "renovation", icon: "🏠", desc: "Appartement, maison complète" },
  { label: "Salle de bain", slug: "plombier", icon: "🛁", desc: "Carrelage, douche, sanitaires" },
  { label: "Cuisine", slug: "menuisier", icon: "🍳", desc: "Aménagement, plans de travail" },
  { label: "Isolation", slug: "renovation", icon: "🧱", desc: "Thermique, phonique, combles" },
];

const ADVANTAGES = [
  { title: "Devis gratuits", desc: "Aucun frais pour les particuliers", icon: "€" },
  { title: "Artisans vérifiés", desc: "Documents et avis contrôlés", icon: "🛡" },
  { title: "Comparaison simple", desc: "Offres structurées et comparables", icon: "📄" },
  { title: "Gain de temps", desc: "Réponse sous 24-48h ouvrées", icon: "⏱" },
];

const STEPS = [
  { title: "Décrivez votre projet", desc: "Quelques questions guidées pour préciser votre besoin.", num: 1 },
  { title: "Recevez plusieurs devis d'artisans", desc: "Votre demande est transmise aux artisans qualifiés. Réponse sous 24-48h.", num: 2 },
  { title: "Comparez et choisissez le meilleur", desc: "Prix, délais, avis clients : vous gardez la main.", num: 3 },
];

export default function HomePage() {
  return (
    <main className="layout-desktop-pc" style={{ minHeight: "100vh", background: WHITE, color: "#0f172a", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      {/* Header - Logo gauche, CTA droite */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: NAVY, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ ...CONTAINER_STYLE, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0" }}>
          <Link href="/">
            <img src="/logo-dark.png" alt="EvalTravaux" style={{ height: 64, width: "auto", objectFit: "contain" }} />
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="header-search" style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", minWidth: 200 }}>
              <span style={{ color: "rgba(255,255,255,0.6)", marginRight: 8 }}>🔍</span>
              <input type="search" placeholder="Rechercher..." aria-label="Rechercher" style={{ background: "transparent", border: "none", color: "#fff", fontSize: 15, outline: "none", width: "100%" }} />
            </div>
            <Link href="/devis-plombier-paris" style={{ color: "rgba(255,255,255,0.9)", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 16 }}>Obtenir mes devis gratuits</Link>
            <Link href="/login" style={{ color: "rgba(255,255,255,0.9)", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 16 }}>Connexion</Link>
            <Link href="/register" style={{ background: ORANGE, color: WHITE, padding: "14px 32px", borderRadius: 8, fontWeight: 600, textDecoration: "none", fontSize: 16, boxShadow: "0 4px 14px rgba(255,140,0,0.4)" }}>
              Inscription artisan
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero - Grid 2 colonnes */}
      <section style={{ background: NAVY, paddingTop: 140, paddingBottom: 120 }}>
        <div className="hero-grid" style={{ ...CONTAINER_STYLE, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", minHeight: 400 }}>
          <div>
            <h1 style={{ fontSize: "clamp(2.75rem, 5vw, 4.5rem)", fontWeight: 700, color: WHITE, margin: 0, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Comparez plusieurs devis travaux fiables en quelques minutes
            </h1>
            <p style={{ fontSize: 20, color: "rgba(255,255,255,0.9)", marginTop: 28, maxWidth: 520, lineHeight: 1.6 }}>
              Décrivez votre projet et recevez rapidement des devis d&apos;artisans qualifiés.
            </p>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: WHITE, padding: "24px 56px", borderRadius: 8, fontWeight: 600, fontSize: 20, marginTop: 40, textDecoration: "none", boxShadow: "0 4px 14px rgba(255,140,0,0.4)" }}>
              Obtenir mes devis gratuits
            </Link>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginTop: 40, fontSize: 16, color: "rgba(255,255,255,0.85)" }}>
              <span>✓ Devis 100% gratuits</span>
              <span>✓ Artisans vérifiés</span>
              <span>✓ Sans engagement</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="100%" height="360" viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 480 }}>
              <rect x="120" y="140" width="240" height="160" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <path d="M240 80 L360 140 L120 140 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <rect x="220" y="220" width="60" height="80" fill={NAVY} opacity="0.6" />
              <circle cx="380" cy="120" r="55" fill={ORANGE} opacity="0.95" />
              <path d="M362 120 L375 133 L398 108" stroke={WHITE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="60" y="240" width="90" height="55" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="80" cy="260" r="8" fill={ORANGE} />
              <text x="100" y="275" fill="rgba(255,255,255,0.9)" fontSize="14" fontFamily="Poppins,sans-serif">Checklist</text>
              <ellipse cx="340" cy="280" rx="50" ry="35" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <path d="M310 280 L325 265 L340 280 L365 255" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      {/* Comment ça marche + Vos besoins - Layout combiné comme l'exemple : gauche 2/3 steps, droite 1/3 services */}
      <section id="comment-ca-marche" style={{ background: "#f8fafc", padding: "96px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Comment fonctionne EvalTravaux ?
          </h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: 20, fontSize: 18 }}>
            Un parcours simple en 3 étapes pour obtenir des devis comparables.
          </p>
          <div className="steps-needs-combined" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, marginTop: 64, alignItems: "start" }}>
            {/* Gauche : 3 cartes shadow-xl côte à côte */}
            <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
              {STEPS.map((s) => (
                <div key={s.num} style={{ background: WHITE, borderRadius: 16, padding: 48, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: NAVY, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 28, marginBottom: 24 }}>{s.num}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>{s.title}</h3>
                  <p style={{ color: "#475569", marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
            {/* Droite : Vos besoins - grille 2 colonnes + carte projet */}
            <div>
              <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, margin: 0 }}>Vos besoins, notre expertise</h2>
              <p style={{ color: "#475569", marginTop: 12, fontSize: 16 }}>Choisissez le type de travaux.</p>
              <div className="needs-services" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginTop: 28 }}>
                {WORK_CATEGORIES.map((cat) => (
                  <Link key={cat.label} href={`/devis-${cat.slug}-paris`} className="card-work" style={{ background: WHITE, border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(15,43,70,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{cat.icon}</div>
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 600, fontSize: 16 }}>{cat.label}</h3>
                      <p style={{ marginTop: 4, fontSize: 14, color: "#64748b" }}>{cat.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ background: WHITE, borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", marginTop: 24 }}>
                <div style={{ height: 140, background: "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)" }} />
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 18, margin: 0 }}>Rénovation appartement complet</h3>
                  <p style={{ color: "#475569", marginTop: 8, fontSize: 15 }}>De 25 000 € à 40 000 €</p>
                  <Link href="/devis-renovation-paris" style={{ display: "inline-block", background: NAVY, color: WHITE, padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 15, marginTop: 16, textDecoration: "none" }}>
                    Voir le projet
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: ORANGE, color: WHITE, padding: "22px 56px", borderRadius: 8, fontWeight: 600, fontSize: 20, textDecoration: "none", boxShadow: "0 4px 14px rgba(255,140,0,0.4)" }}>
              Démarrer ma demande →
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi utiliser EvalTravaux - Avantages à gauche, CTA orange à droite (comme l'exemple) */}
      <section style={{ padding: "96px 0" }}>
        <div style={CONTAINER_STYLE}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, margin: 0 }}>Pourquoi utiliser EvalTravaux ?</h2>
          <p style={{ color: "#475569", marginTop: 20, fontSize: 18 }}>Des avantages concrets pour simplifier vos projets.</p>
          <div className="advantages-cta-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, marginTop: 56, alignItems: "stretch" }}>
            <div className="advantages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {ADVANTAGES.map((adv) => (
                <div key={adv.title} style={{ background: WHITE, border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(15,43,70,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: NAVY, fontSize: 24 }}>{adv.icon}</div>
                  <h3 style={{ marginTop: 16, fontWeight: 600, fontSize: 18 }}>{adv.title}</h3>
                  <p style={{ marginTop: 8, fontSize: 15, color: "#475569", lineHeight: 1.5 }}>{adv.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: ORANGE, borderRadius: 16, padding: 48, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <h3 style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: WHITE, margin: 0 }}>Recevez vos devis travaux gratuitement</h3>
              <p style={{ color: "rgba(255,255,255,0.95)", marginTop: 16, fontSize: 16, lineHeight: 1.5 }}>Décrivez votre projet et recevez rapidement des devis comparables.</p>
              <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: WHITE, color: ORANGE, padding: "18px 40px", borderRadius: 8, fontWeight: 600, fontSize: 18, marginTop: 28, textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                Obtenir mes devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Bloc bleu/orange pleine largeur */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={CONTAINER_STYLE}>
          <div className="cta-final-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ background: NAVY, padding: 64, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: WHITE, margin: 0 }}>Recevez vos devis travaux gratuitement</h2>
              <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 20, fontSize: 18, lineHeight: 1.6 }}>Décrivez votre projet et recevez rapidement des devis comparables.</p>
            </div>
            <div style={{ background: ORANGE, padding: 64, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <Link href="/devis-plombier-paris" style={{ display: "inline-block", background: WHITE, color: ORANGE, padding: "22px 56px", borderRadius: 8, fontWeight: 600, fontSize: 20, textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                Obtenir mes devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: NAVY, color: WHITE, padding: "80px 0 40px" }}>
        <div style={{ ...CONTAINER_STYLE, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 64 }}>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>EvalTravaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
              <li style={{ marginBottom: 12 }}><Link href="#comment-ca-marche" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Comment ça marche</Link></li>
              <li style={{ marginBottom: 12 }}><Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>Travaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
              <li style={{ marginBottom: 12 }}><Link href="/devis-plombier-paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Plomberie</Link></li>
              <li style={{ marginBottom: 12 }}><Link href="/devis-renovation-paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Rénovation</Link></li>
              <li style={{ marginBottom: 12 }}><Link href="/devis-menuisier-paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Cuisine</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
              <li style={{ marginBottom: 12 }}><Link href="/mentions-legales" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Mentions légales</Link></li>
              <li style={{ marginBottom: 12 }}><Link href="/politique-confidentialite" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 16 }}>Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 14, marginTop: 64, paddingTop: 40, borderTop: "1px solid #334155" }}>
          © {new Date().getFullYear()} EvalTravaux. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
