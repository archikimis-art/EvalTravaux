import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfessionalSummary(professionalId: string) {
    const [professional, leadsReceived, leadsPurchased, credits] = await Promise.all([
      this.prisma.professional.findUnique({
        where: { id: professionalId },
      }),
      this.prisma.lead.count({
        where: {
          professionals: {
            some: { id: professionalId },
          },
        },
      }),
      this.prisma.leadPurchase.count({
        where: { professionalId },
      }),
      this.prisma.credit.findFirst({
        where: { professionalId },
      }),
    ]);

    const conversionRate =
      leadsReceived > 0 ? Math.round((leadsPurchased / leadsReceived) * 100) : 0;

    const revenueByMonth = await this.prisma.leadPurchase.groupBy({
      by: ["professionalId"],
      where: { professionalId },
      _sum: { creditsUsed: true },
    });

    const creditsUsedTotal = revenueByMonth[0]?._sum.creditsUsed ?? 0;

    return {
      professionalId,
      companyName: professional?.companyName ?? "",
      trade: professional?.trade ?? "",
      city: professional?.city ?? "",
      leadsReceived,
      leadsPurchased,
      conversionRate,
      creditsBalance: credits?.balance ?? 0,
      averageRating: professional?.averageRating ?? 0,
      ratingCount: professional?.ratingCount ?? 0,
      creditsUsedTotal,
    };
  }

  async getProfessionalLeads(professionalId: string) {
    const leads = await this.prisma.lead.findMany({
      where: {
        professionals: {
          some: { id: professionalId },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        title: true,
        city: true,
        trade: true,
        createdAt: true,
        budgetMin: true,
        budgetMax: true,
        status: true,
        contactEmail: true,
        contactPhone: true,
      },
    });

    return leads;
  }
}

