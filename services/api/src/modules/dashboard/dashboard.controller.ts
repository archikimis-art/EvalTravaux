import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProfessionalIdGuard } from "../auth/professional-id.guard";
import { DashboardService } from "./dashboard.service";

@Controller("dashboard")
@UseGuards(JwtAuthGuard, ProfessionalIdGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get("professionals/:professionalId/summary")
  async getSummary(@Param("professionalId") professionalId: string) {
    return this.dashboardService.getProfessionalSummary(professionalId);
  }

  @Get("professionals/:professionalId/leads")
  async getLeads(@Param("professionalId") professionalId: string) {
    return this.dashboardService.getProfessionalLeads(professionalId);
  }
}

