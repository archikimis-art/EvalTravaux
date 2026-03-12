import { AiService } from "./ai.service";

describe("AiService", () => {
  let service: AiService;

  beforeEach(() => {
    service = new AiService();
  });

  describe("estimateProject", () => {
    it("retourne des lignes et un total pour une surface par défaut", () => {
      const result = service.estimateProject({});
      expect(result.lines).toHaveLength(5);
      expect(result.total).toBeGreaterThan(0);
      expect(result.lines.reduce((s, l) => s + l.amount, 0)).toBe(result.total);
    });

    it("adapte les montants à la surface", () => {
      const r60 = service.estimateProject({ surface: 60 });
      const r120 = service.estimateProject({ surface: 120 });
      expect(r120.total).toBeGreaterThan(r60.total);
    });

    it("utilise le type de travaux pour la dernière ligne", () => {
      const renov = service.estimateProject({ workType: "Rénovation complète" });
      const rafraich = service.estimateProject({ workType: "Rafraîchissement" });
      const lineReno = renov.lines.find((l) => l.label === "Cuisine");
      const lineRaf = rafraich.lines.find((l) => l.label === "Travaux");
      expect(lineReno).toBeDefined();
      expect(lineRaf).toBeDefined();
      expect(renov.total).not.toBe(rafraich.total);
    });
  });
});
