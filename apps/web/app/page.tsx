import Link from "next/link";

const NAVY = "#0f2b46";
const ORANGE = "#ff8c00";
const WHITE = "#ffffff";
const PX = 64;
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
  { label: "Toiture, terrasse", slug: "couvreur", icon: "🏠", desc: "Toit, terrasse, étanchéité" },
  { label: "Ravalement", slug: "ravalement", icon: "🖌", desc: "Façade, ravalement de murs" },
  { label: "Chauffage", slug: "chauffagiste", icon: "🔥", desc: "Chaudière, radiateurs, PAC" },
  { label: "Ventilation", slug: "ventilation", icon: "💨", desc: "VMC, aération, qualité d'air" },
  { label: "Plâtrerie", slug: "plâtrier", icon: "📐", desc: "Placo, cloisons, joints" },
  { label: "Peinture", slug: "peintre", icon: "🖌", desc: "Murs, plafonds, finitions" },
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
    <main className="layout-desktop-pc" style={{ width: "100%", maxWidth: "100%", minHeight: "100vh", background: WHITE, color: "#0f172a", fontFamily: "'Poppins', system-ui, sans-serif", overflowX: "hidden" }}>
      {/* Header - Logo gauche, CTA droite */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 50, background: NAVY, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="content-centered" style={{ ...CONTAINER_STYLE, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 0" }}>
          <Link href="/">
            <img src="/logo-dark.png" alt="EvalTravaux" style={{ height: 230, width: "auto", objectFit: "contain" }} />
          </Link>
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 20px", minWidth: 260 }}>
              <span style={{ color: "rgba(255,255,255,0.6)", marginRight: 10 }}>🔍</span>
              <input type="search" placeholder="Rechercher..." aria-label="Rechercher" style={{ background: "transparent", border: "none", color: "#fff", fontSize: 16, outline: "none", width: "100%" }} />
            </div>
            <Link href="/devis/plombier" style={{ background: ORANGE, color: WHITE, padding: "14px 24px", borderRadius: 10, textDecoration: "none", fontSize: 15, fontWeight: 600, boxShadow: "0 4px 14px rgba(255,140,0,0.4)", whiteSpace: "nowrap", textAlign: "center" }}>Obtenir mes devis gratuits</Link>
            <Link href="/login" style={{ color: "rgba(255,255,255,0.9)", padding: "14px 24px", borderRadius: 10, textDecoration: "none", fontSize: 15, whiteSpace: "nowrap" }}>Connexion</Link>
            <Link href="/pro/inscription" style={{ background: ORANGE, color: WHITE, padding: "14px 24px", borderRadius: 10, fontWeight: 600, textDecoration: "none", fontSize: 15, boxShadow: "0 4px 14px rgba(255,140,0,0.4)", whiteSpace: "nowrap", textAlign: "center" }}>
              Inscription artisan
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero - Grid 2 colonnes, proportions référence */}
      <section style={{ width: "100%", background: NAVY, paddingTop: 520, paddingBottom: 72, overflow: "visible" }}>
        <div className="content-centered hero-grid" style={{ ...CONTAINER_STYLE, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", minHeight: 320, overflow: "visible" }}>
          <div style={{ overflow: "visible", minWidth: 0 }}>
            <h1 style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", fontWeight: 700, color: WHITE, margin: 0, lineHeight: 1.25, letterSpacing: "-0.02em", wordBreak: "break-word" }}>
              Comparez plusieurs devis travaux fiables en quelques minutes
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.9)", marginTop: 14, maxWidth: 420, lineHeight: 1.5 }}>
              Décrivez votre projet et recevez rapidement des devis d&apos;artisans qualifiés.
            </p>
            <Link href="/devis/plombier" style={{ display: "inline-block", background: ORANGE, color: WHITE, padding: "14px 32px", borderRadius: 10, fontWeight: 600, fontSize: 15, marginTop: 20, textDecoration: "none", boxShadow: "0 4px 14px rgba(255,140,0,0.4)", whiteSpace: "nowrap" }}>
              Obtenir mes devis gratuits
            </Link>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 22, fontSize: 14, color: "rgba(255,255,255,0.85)" }}>
              <span>✓ Devis 100% gratuits</span>
              <span>✓ Artisans vérifiés</span>
              <span>✓ Sans engagement</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", borderRadius: 16, overflow: "hidden", maxWidth: 480 }}>
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=85" alt="Artisan au travail - rénovation" style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${NAVY}88 0%, ${NAVY}cc 50%, transparent 100%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "flex", alignItems: "center", gap: 12, pointerEvents: "none" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: ORANGE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
              </div>
              <div>
                <div style={{ color: WHITE, fontWeight: 700, fontSize: 18 }}>Devis travaux</div>
                <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>Artisans qualifiés à votre service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment fonctionne - proportions équilibrées */}
      <section id="comment-ca-marche" style={{ width: "100%", background: "#f8fafc", padding: "80px 0" }}>
        <div className="content-centered" style={{ ...CONTAINER_STYLE, width: "100%" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>
            Comment fonctionne EvalTravaux ?
          </h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: 16, fontSize: 17 }}>
            Un parcours simple en 3 étapes pour obtenir des devis comparables.
          </p>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, marginTop: 56, width: "100%" }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ background: WHITE, borderRadius: 20, padding: "40px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", minHeight: 260, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: NAVY, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 32, marginBottom: 24 }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: "#475569", marginTop: 16, fontSize: 15, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vos besoins - Layout référence : grille gauche (2x3) + carte projet droite */}
      <section style={{ width: "100%", background: WHITE, padding: "80px 0 100px" }}>
        <div className="content-centered" style={{ ...CONTAINER_STYLE, width: "100%" }}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, margin: 0 }}>Vos besoins, notre expertise</h2>
          <p style={{ color: "#475569", marginTop: 12, fontSize: 17 }}>Choisissez le type de travaux.</p>
          <div className="needs-section-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 48, alignItems: "stretch" }}>
            {/* Grille 6 catégories - 2 colonnes x 3 lignes */}
            <div className="needs-services" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {WORK_CATEGORIES.map((cat) => (
                <Link key={cat.label} href={`/devis/${cat.slug}`} className="card-work" style={{ background: WHITE, border: "1px solid #e2e8f0", borderRadius: 16, padding: 24, textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.04)", minHeight: 100 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(15,43,70,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{cat.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: 17 }}>{cat.label}</h3>
                    <p style={{ marginTop: 6, fontSize: 14, color: "#64748b", lineHeight: 1.4 }}>{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
            {/* Carte projet mise en avant - droite */}
            <div style={{ background: WHITE, border: "1px solid #e2e8f0", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "100%", height: 320, position: "relative", overflow: "hidden" }}>
                <img src="/images/Photos_travaux.png" alt="Rénovation complète - EvalTravaux" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: 32, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontWeight: 600, fontSize: 22, margin: 0 }}>Rénovation maison, appartement</h3>
                  <p style={{ color: "#475569", marginTop: 12, fontSize: 17 }}>Devis personnalisé selon votre projet et la surface</p>
                </div>
                <Link href="/devis/renovation/paris" style={{ display: "inline-block", background: NAVY, color: WHITE, padding: "16px 32px", borderRadius: 12, fontWeight: 600, fontSize: 17, marginTop: 24, textDecoration: "none", alignSelf: "flex-start" }}>
                  Voir le projet
                </Link>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <Link href="/devis/plombier" style={{ display: "inline-block", background: ORANGE, color: WHITE, padding: "20px 56px", borderRadius: 12, fontWeight: 600, fontSize: 17, textDecoration: "none", boxShadow: "0 4px 14px rgba(255,140,0,0.4)" }}>
              Découvrir nos domaines →
            </Link>
          </div>
        </div>
      </section>

      {/* Pourquoi utiliser EvalTravaux */}
      <section style={{ width: "100%", padding: "80px 0" }}>
        <div className="content-centered" style={CONTAINER_STYLE}>
          <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, margin: 0 }}>Pourquoi utiliser EvalTravaux ?</h2>
          <p style={{ color: "#475569", marginTop: 12, fontSize: 17 }}>Des avantages concrets pour simplifier vos projets.</p>
          <div className="advantages-cta-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 48, marginTop: 48, alignItems: "stretch" }}>
            <div className="advantages-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {ADVANTAGES.map((adv) => (
                <div key={adv.title} style={{ background: WHITE, border: "1px solid #e2e8f0", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(15,43,70,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: NAVY, fontSize: 24 }}>{adv.icon}</div>
                  <h3 style={{ marginTop: 20, fontWeight: 600, fontSize: 18 }}>{adv.title}</h3>
                  <p style={{ marginTop: 12, fontSize: 15, color: "#475569", lineHeight: 1.5 }}>{adv.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: ORANGE, borderRadius: 20, padding: 48, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <h3 style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", fontWeight: 700, color: WHITE, margin: 0 }}>Recevez vos devis travaux gratuitement</h3>
              <p style={{ color: "rgba(255,255,255,0.95)", marginTop: 16, fontSize: 16, lineHeight: 1.5 }}>Décrivez votre projet et recevez rapidement des devis comparables.</p>
              <Link href="/devis/plombier" style={{ display: "inline-block", background: WHITE, color: ORANGE, padding: "18px 40px", borderRadius: 12, fontWeight: 600, fontSize: 17, marginTop: 28, textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                Obtenir mes devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{ width: "100%", padding: "0 0 80px" }}>
        <div style={CONTAINER_STYLE}>
          <div className="cta-final-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
            <div style={{ background: NAVY, padding: 56, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)", fontWeight: 700, color: WHITE, margin: 0 }}>Recevez vos devis travaux gratuitement</h2>
              <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 16, fontSize: 16, lineHeight: 1.5 }}>Décrivez votre projet et recevez rapidement des devis comparables.</p>
            </div>
            <div style={{ background: ORANGE, padding: 56, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <Link href="/devis/plombier" style={{ display: "inline-block", background: WHITE, color: ORANGE, padding: "18px 48px", borderRadius: 10, fontWeight: 600, fontSize: 17, textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                Obtenir mes devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ width: "100%", background: NAVY, color: WHITE, padding: "64px 0 32px" }}>
        <div className="content-centered" style={{ ...CONTAINER_STYLE, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 56 }}>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>EvalTravaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
              <li style={{ marginBottom: 14 }}><Link href="#comment-ca-marche" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Comment ça marche</Link></li>
              <li style={{ marginBottom: 14 }}><Link href="/contact" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>Travaux</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
              <li style={{ marginBottom: 14 }}><Link href="/devis/plombier" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Plomberie</Link></li>
              <li style={{ marginBottom: 14 }}><Link href="/devis/renovation/paris" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Rénovation</Link></li>
              <li style={{ marginBottom: 14 }}><Link href="/devis/menuisier" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Cuisine</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 600, margin: 0, fontSize: 18 }}>Légal</h4>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
              <li style={{ marginBottom: 14 }}><Link href="/mentions-legales" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Mentions légales</Link></li>
              <li style={{ marginBottom: 14 }}><Link href="/politique-confidentialite" style={{ color: "#94a3b8", textDecoration: "none", fontSize: 15 }}>Politique de confidentialité</Link></li>
            </ul>
          </div>
        </div>
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 15, marginTop: 64, paddingTop: 40, borderTop: "1px solid #334155" }} suppressHydrationWarning>
          © {new Date().getFullYear()} EvalTravaux. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
}
