import Link from "next/link";

export const metadata = {
  title: "Contact – EvalTravaux",
  description: "Contactez l'équipe EvalTravaux pour toute question sur nos services de devis travaux.",
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: 640, margin: "0 auto", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <Link href="/" style={{ color: "#0f2b46", textDecoration: "none", fontSize: 16, marginBottom: 32, display: "inline-block" }}>← Retour à l&apos;accueil</Link>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a", margin: "0 0 24px" }}>Contact</h1>
      <p style={{ color: "#475569", lineHeight: 1.6, marginBottom: 32 }}>
        Pour toute question concernant EvalTravaux, nos services de devis travaux ou votre espace professionnel, vous pouvez nous contacter :
      </p>
      <div style={{ background: "#f8fafc", borderRadius: 12, padding: 24, marginBottom: 32 }}>
        <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Email</p>
        <a href="mailto:contact@evaltravaux.fr" style={{ color: "#0f2b46", fontWeight: 600, fontSize: 18 }}>contact@evaltravaux.fr</a>
      </div>
      <Link href="/" style={{ display: "inline-block", background: "#ff8c00", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none" }}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
