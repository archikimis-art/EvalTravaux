import Link from "next/link";

export const metadata = {
  title: "Mentions légales – EvalTravaux",
  description: "Mentions légales du site EvalTravaux.",
};

export default function MentionsLegalesPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <Link href="/" style={{ color: "#0f2b46", textDecoration: "none", fontSize: 16, marginBottom: 32, display: "inline-block" }}>← Retour à l&apos;accueil</Link>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a", margin: "0 0 32px" }}>Mentions légales</h1>
      <div style={{ color: "#475569", lineHeight: 1.8, fontSize: 15 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginTop: 32 }}>Éditeur du site</h2>
        <p>Le site www.evaltravaux.fr est édité par EvalTravaux.</p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginTop: 32 }}>Hébergement</h2>
        <p>Le site est hébergé par Render.com.</p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginTop: 32 }}>Propriété intellectuelle</h2>
        <p>L&apos;ensemble du contenu de ce site (textes, images, logos) est protégé par le droit d&apos;auteur et appartient à EvalTravaux.</p>
      </div>
      <Link href="/" style={{ display: "inline-block", background: "#ff8c00", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none", marginTop: 40 }}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
