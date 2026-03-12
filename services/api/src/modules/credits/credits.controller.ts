import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LeadSize } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProfessionalIdGuard } from "../auth/professional-id.guard";
import { CreditsService } from "./credits.service";

class PurchaseCreditsDto {
  professionalId!: string;
  packSize!: 50 | 100 | 200;
}

class ConsumeCreditsDto {
  professionalId!: string;
  leadId!: string;
  size!: LeadSize;
}

class CreateCheckoutSessionDto {
  professionalId!: string;
  packSize!: 50 | 100 | 200;
  successUrl!: string;
  cancelUrl!: string;
}

class ConfirmSessionDto {
  professionalId!: string;
  sessionId!: string;
}

@Controller("credits")
@UseGuards(JwtAuthGuard, ProfessionalIdGuard)
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get(":professionalId/balance")
  async getBalance(@Param("professionalId") professionalId: string) {
    const balance = await this.creditsService.getCreditBalance(professionalId);
    return { balance };
  }

  @Post("create-checkout-session")
  async createCheckoutSession(@Body() body: CreateCheckoutSessionDto) {
    return this.creditsService.createCheckoutSession(
      body.professionalId,
      body.packSize,
      body.successUrl,
      body.cancelUrl,
    );
  }

  @Post("confirm-session")
  async confirmSession(@Body() body: ConfirmSessionDto) {
    return this.creditsService.confirmStripeSession(body.sessionId, body.professionalId);
  }

  @Post("purchase")
  async purchase(@Body() body: PurchaseCreditsDto) {
    return this.creditsService.purchaseCredits(body.professionalId, body.packSize);
  }

  @Post("consume")
  async consume(@Body() body: ConsumeCreditsDto) {
    return this.creditsService.consumeCreditsForLead(
      body.professionalId,
      body.leadId,
      body.size,
    );
  }
}

