import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité – EvalTravaux",
  description: "Politique de confidentialité et protection des données personnelles sur EvalTravaux.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: 720, margin: "0 auto", fontFamily: "'Poppins', system-ui, sans-serif" }}>
      <Link href="/" style={{ color: "#0f2b46", textDecoration: "none", fontSize: 16, marginBottom: 32, display: "inline-block" }}>← Retour à l&apos;accueil</Link>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#0f172a", margin: "0 0 32px" }}>Politique de confidentialité</h1>
      <div style={{ color: "#475569", lineHeight: 1.8, fontSize: 15 }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginTop: 32 }}>Données collectées</h2>
        <p>EvalTravaux collecte les données nécessaires au traitement de vos demandes de devis : nom, email, téléphone, adresse du projet et description des travaux.</p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginTop: 32 }}>Utilisation des données</h2>
        <p>Vos données sont utilisées pour mettre en relation votre projet avec des artisans qualifiés et pour vous envoyer des devis.</p>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#0f172a", marginTop: 32 }}>Vos droits</h2>
        <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Contactez-nous à contact@evaltravaux.fr.</p>
      </div>
      <Link href="/" style={{ display: "inline-block", background: "#ff8c00", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none", marginTop: 40 }}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
