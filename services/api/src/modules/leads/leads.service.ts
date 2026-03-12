import { Injectable } from "@nestjs/common";
import { LeadSize } from "@prisma/client";
import { EmailService } from "../email/email.service";
import { PrismaService } from "../../prisma/prisma.service";

type CreateLeadInput = {
  customerId: string;
  title: string;
  description: string;
  trade: string;
  city: string;
  contactEmail?: string;
  contactPhone?: string;
  surface?: number;
  budgetMin?: number;
  budgetMax?: number;
  size: LeadSize;
};

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createLead(payload: CreateLeadInput) {
    const lead = await this.prisma.lead.create({
      data: payload,
    });

    await this.distributeLeadToProfessionals(lead.id);

    const leadWithPros = await this.prisma.lead.findUnique({
      where: { id: lead.id },
      include: { professionals: { include: { user: true } } },
    });
    if (leadWithPros?.professionals?.length) {
      const emails = leadWithPros.professionals
        .map((p) => p.user?.email)
        .filter((e): e is string => !!e);
      await this.emailService.sendNewLeadToProfessionals(lead.id, emails, lead.title);
    }

    return lead;
  }

  async distributeLeadToProfessionals(leadId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });
    if (!lead) return;

    const professionals = await this.prisma.professional.findMany({
      where: { trade: lead.trade },
    });

    const scored = professionals
      .map((pro) => {
        const distanceScore = 0; // TODO: calculer selon la ville / géolocalisation
        const ratingScore = (pro.averageRating ?? 0) * 10;
        const leadResponseRate = 0; // TODO: calculer selon l'historique de réponses
        const recentActivityScore = 0; // TODO: calculer selon la dernière activité

        const score =
          distanceScore + ratingScore + leadResponseRate + recentActivityScore;

        return { pro, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // pour chaque pro sélectionné, créer une entrée de relation LeadProfessionals via update
    await Promise.all(
      scored.map(({ pro }) =>
        this.prisma.lead.update({
          where: { id: lead.id },
          data: {
            professionals: {
              connect: { id: pro.id },
            },
          },
        }),
      ),
    );

    return scored.map(({ pro, score }) => ({ professionalId: pro.id, score }));
  }

  async getLeadWithProfessionals(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        professionals: true,
      },
    });
  }
}

