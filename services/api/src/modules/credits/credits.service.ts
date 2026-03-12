import { Injectable, BadRequestException } from "@nestjs/common";
import { LeadSize } from "@prisma/client";
import Stripe from "stripe";
import { EmailService } from "../email/email.service";
import { PrismaService } from "../../prisma/prisma.service";

const PACK_PRICE_EUR: Record<number, number> = {
  50: 80,
  100: 140,
  200: 240,
};

export function calculateLeadPrice(size: LeadSize): number {
  switch (size) {
    case "SMALL":
      return 5;
    case "MEDIUM":
      return 10;
    case "LARGE":
      return 20;
    default:
      return 10;
  }
}

const LOW_CREDITS_THRESHOLD = 20;

@Injectable()
export class CreditsService {
  private stripe: Stripe | null = null;

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (secret) this.stripe = new Stripe(secret, { apiVersion: "2023-10-16" });
  }

  async getCreditBalance(professionalId: string): Promise<number> {
    const credit = await this.prisma.credit.findFirst({
      where: { professionalId },
    });
    return credit?.balance ?? 0;
  }

  async ensureCreditAccount(professionalId: string) {
    const existing = await this.prisma.credit.findFirst({
      where: { professionalId },
    });
    if (existing) return existing;
    return this.prisma.credit.create({
      data: { professionalId, balance: 0 },
    });
  }

  async createCheckoutSession(
    professionalId: string,
    packSize: 50 | 100 | 200,
    successUrl: string,
    cancelUrl: string,
  ): Promise<{ url: string }> {
    if (!this.stripe) {
      throw new BadRequestException("Paiement Stripe non configuré (STRIPE_SECRET_KEY).");
    }
    const amountEur = PACK_PRICE_EUR[packSize];
    if (!amountEur) throw new BadRequestException("Pack invalide (50, 100 ou 200).");

    const session = await this.stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: amountEur * 100,
            product_data: {
              name: `Pack ${packSize} crédits EvalTravaux`,
              description: `Crédits pour acheter des coordonnées de leads (${amountEur} €).`,
            },
          },
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { professionalId, packSize: String(packSize) },
    });
    if (!session.url) {
      throw new BadRequestException("Impossible de créer la session de paiement.");
    }
    return { url: session.url };
  }

  async confirmStripeSession(sessionId: string, professionalId: string): Promise<{ balance: number }> {
    if (!this.stripe) {
      throw new BadRequestException("Stripe non configuré.");
    }
    const existing = await this.prisma.stripePayment.findUnique({
      where: { sessionId },
    });
    if (existing) {
      const balance = await this.getCreditBalance(professionalId);
      return { balance };
    }

    const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });
    if (session.payment_status !== "paid") {
      throw new BadRequestException("Paiement non finalisé.");
    }
    const meta = session.metadata as { professionalId?: string; packSize?: string } | null;
    const packSize = meta?.packSize ? parseInt(meta.packSize, 10) : 0;
    if (meta?.professionalId !== professionalId || ![50, 100, 200].includes(packSize)) {
      throw new BadRequestException("Session invalide ou ne correspond pas à ce compte.");
    }

    const credit = await this.ensureCreditAccount(professionalId);
    const amountEur = PACK_PRICE_EUR[packSize] ?? 0;

    await this.prisma.$transaction([
      this.prisma.stripePayment.create({
        data: { sessionId, professionalId, packSize },
      }),
      this.prisma.credit.update({
        where: { id: credit.id },
        data: {
          balance: credit.balance + packSize,
          transactions: {
            create: {
              amount: amountEur,
              type: "CREDIT_PURCHASE",
            },
          },
        },
      }),
    ]);

    const balance = await this.getCreditBalance(professionalId);
    return { balance };
  }

  async purchaseCredits(professionalId: string, packSize: 50 | 100 | 200) {
    const amount = PACK_PRICE_EUR[packSize];
    if (!amount) {
      throw new BadRequestException("Invalid pack size");
    }

    const credit = await this.ensureCreditAccount(professionalId);

    const updated = await this.prisma.credit.update({
      where: { id: credit.id },
      data: {
        balance: credit.balance + packSize,
        transactions: {
          create: {
            amount,
            type: "CREDIT_PURCHASE",
          },
        },
      },
    });

    return { balance: updated.balance };
  }

  async consumeCreditsForLead(professionalId: string, leadId: string, size: LeadSize) {
    const price = calculateLeadPrice(size);
    const credit = await this.ensureCreditAccount(professionalId);

    if (credit.balance < price) {
      throw new BadRequestException("Not enough credits");
    }

    await this.prisma.$transaction([
      this.prisma.credit.update({
        where: { id: credit.id },
        data: {
          balance: credit.balance - price,
          transactions: {
            create: {
              amount: -price,
              type: "LEAD_PURCHASE",
            },
          },
        },
      }),
      this.prisma.leadPurchase.create({
        data: {
          leadId,
          professionalId,
          creditsUsed: price,
        },
      }),
    ]);

    const updatedBalance = await this.getCreditBalance(professionalId);

    const [pro, lead] = await Promise.all([
      this.prisma.professional.findUnique({
        where: { id: professionalId },
        include: { user: true },
      }),
      this.prisma.lead.findUnique({ where: { id: leadId } }),
    ]);
    if (pro?.user?.email && lead) {
      await this.emailService.sendLeadPurchased(
        pro.user.email,
        lead.title,
        price,
        updatedBalance,
      );
      if (updatedBalance < LOW_CREDITS_THRESHOLD) {
        await this.emailService.sendLowCredits(pro.user.email, updatedBalance);
      }
    }

    return { creditsUsed: price, balance: updatedBalance };
  }
}

