import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { LeadSize } from "@prisma/client";
import { LeadsService } from "./leads.service";

class CreateLeadDto {
  customerId!: string;
  title!: string;
  description!: string;
  trade!: string;
  city!: string;
  contactEmail?: string;
  contactPhone?: string;
  surface?: number;
  budgetMin?: number;
  budgetMax?: number;
  size!: LeadSize;
}

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  async createLead(@Body() body: CreateLeadDto) {
    const lead = await this.leadsService.createLead(body);
    return { leadId: lead.id };
  }

  @Post(":id/distribute")
  async distribute(@Param("id") id: string) {
    const result = await this.leadsService.distributeLeadToProfessionals(id);
    return { leadId: id, distribution: result };
  }

  @Get(":id")
  async getLead(@Param("id") id: string) {
    return this.leadsService.getLeadWithProfessionals(id);
  }
}

