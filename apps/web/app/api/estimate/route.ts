import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export type EstimateBody = {
  description?: string;
  workType?: string;
  surface?: number;
  budget?: string;
  trade?: string;
  city?: string;
};

export type EstimateLine = { label: string; amount: number };
export type EstimateResponse = { lines: EstimateLine[]; total: number };

/** Mock estimation when backend is unavailable (base sur surface + type). */
function mockEstimate(body: EstimateBody): EstimateResponse {
  const surface = body.surface ?? 60;
  const workType = body.workType ?? "Rénovation complète";
  const lines: EstimateLine[] = [
    { label: "Démolition", amount: Math.round(1500 * (surface / 60)) },
    { label: "Plomberie", amount: Math.round(4500 * (surface / 60)) },
    { label: "Électricité", amount: Math.round(3200 * (surface / 60)) },
    { label: "Peinture", amount: Math.round(2500 * (surface / 60)) },
    { label: workType === "Rénovation complète" ? "Cuisine" : "Travaux", amount: workType === "Rénovation complète" ? 9000 : 4000 },
  ];
  const total = lines.reduce((s, l) => s + l.amount, 0);
  return { lines, total };
}

export async function POST(request: NextRequest) {
  const body: EstimateBody = await request.json().catch(() => ({}));
  try {
    const res = await fetch(`${API_URL}/api/ai/estimate-project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data: EstimateResponse = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Backend indisponible : fallback mock
  }
  return NextResponse.json(mockEstimate(body));
}
