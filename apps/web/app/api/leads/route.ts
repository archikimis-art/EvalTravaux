import { NextRequest, NextResponse } from "next/server";

type CreateLeadBody = {
  description?: string;
  workType?: string;
  surface?: number;
  budget?: string;
  trade?: string;
  city?: string;
  email?: string;
  phone?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const PUBLIC_CUSTOMER_ID = process.env.NEXT_PUBLIC_PUBLIC_CUSTOMER_ID || "";

function inferBudget(budget?: string) {
  if (!budget) return { budgetMin: undefined, budgetMax: undefined };
  if (budget.includes("Moins de 5 000")) {
    return { budgetMin: 0, budgetMax: 5000 };
  }
  if (budget.includes("5 000 € – 20 000 €")) {
    return { budgetMin: 5000, budgetMax: 20000 };
  }
  if (budget.includes("Plus de 20 000")) {
    return { budgetMin: 20000, budgetMax: 50000 };
  }
  return { budgetMin: undefined, budgetMax: undefined };
}

function inferLeadSize(budget?: string) {
  if (!budget) return "MEDIUM";
  if (budget.includes("Moins de 5 000")) return "SMALL";
  if (budget.includes("Plus de 20 000")) return "LARGE";
  return "MEDIUM";
}

export async function POST(request: NextRequest) {
  const body: CreateLeadBody = await request.json().catch(() => ({}));

  if (!body.trade || !body.city || !body.description) {
    return NextResponse.json(
      { message: "Métier, ville et description sont obligatoires." },
      { status: 400 },
    );
  }

  if (!PUBLIC_CUSTOMER_ID) {
    return NextResponse.json(
      {
        message:
          "Configuration manquante côté serveur (NEXT_PUBLIC_PUBLIC_CUSTOMER_ID).",
      },
      { status: 500 },
    );
  }

  const { budgetMin, budgetMax } = inferBudget(body.budget);
  const size = inferLeadSize(body.budget);

  const titleParts: string[] = [];
  if (body.workType) titleParts.push(body.workType);
  if (body.trade) titleParts.push(body.trade);
  if (body.city) titleParts.push(`à ${body.city}`);
  const title = titleParts.join(" – ") || "Demande de devis travaux";

  const payload = {
    customerId: PUBLIC_CUSTOMER_ID,
    title,
    description: body.description,
    trade: body.trade,
    city: body.city,
    contactEmail: body.email,
    contactPhone: body.phone,
    surface: body.surface,
    budgetMin,
    budgetMax,
    size,
  };

  try {
    const res = await fetch(`${API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { message: data?.message || "Erreur lors de la création du lead." },
        { status: res.status },
      );
    }

    return NextResponse.json({ leadId: data.leadId ?? null });
  } catch {
    return NextResponse.json(
      { message: "Impossible de contacter l’API EvalTravaux." },
      { status: 502 },
    );
  }
}

