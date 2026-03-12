import { Injectable } from "@nestjs/common";

export type EstimateLine = { label: string; amount: number };
export type EstimateResult = { lines: EstimateLine[]; total: number };

type EstimateInput = {
  description?: string;
  workType?: string;
  surface?: number;
  budget?: string;
  trade?: string;
  city?: string;
};

@Injectable()
export class AiService {
  /**
   * Estimation indicative poste par poste.
   * À terme : LLM + base de prix ; pour le MVP : règles simples.
   */
  estimateProject(input: EstimateInput): EstimateResult {
    const surface = input.surface ?? 60;
    const workType = input.workType ?? "Rénovation complète";

    const lines: EstimateLine[] = [
      { label: "Démolition", amount: Math.round(1500 * (surface / 60)) },
      { label: "Plomberie", amount: Math.round(4500 * (surface / 60)) },
      { label: "Électricité", amount: Math.round(3200 * (surface / 60)) },
      { label: "Peinture", amount: Math.round(2500 * (surface / 60)) },
      {
        label: workType === "Rénovation complète" ? "Cuisine" : "Travaux",
        amount: workType === "Rénovation complète" ? 9000 : 4000,
      },
    ];

    const total = lines.reduce((sum, line) => sum + line.amount, 0);

    return { lines, total };
  }
}
