import { LeadSize } from "@prisma/client";
import { calculateLeadPrice } from "./credits.service";

describe("calculateLeadPrice", () => {
  it("retourne 5 pour SMALL", () => {
    expect(calculateLeadPrice(LeadSize.SMALL)).toBe(5);
  });

  it("retourne 10 pour MEDIUM", () => {
    expect(calculateLeadPrice(LeadSize.MEDIUM)).toBe(10);
  });

  it("retourne 20 pour LARGE", () => {
    expect(calculateLeadPrice(LeadSize.LARGE)).toBe(20);
  });
});
