import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProfessionalDocumentType } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ProfessionalIdGuard } from "../auth/professional-id.guard";
import { DocumentsService } from "./documents.service";

class UpsertDocumentDto {
  professionalId!: string;
  type!: ProfessionalDocumentType;
  url!: string;
  expiresAt?: string;
}

@Controller("documents")
@UseGuards(JwtAuthGuard, ProfessionalIdGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get("professional/:professionalId")
  async list(@Param("professionalId") professionalId: string) {
    return this.documentsService.listForProfessional(professionalId);
  }

  @Post()
  async upsert(@Body() body: UpsertDocumentDto) {
    const expiresAt = body.expiresAt ? new Date(body.expiresAt) : undefined;
    return this.documentsService.upsertDocument({
      professionalId: body.professionalId,
      type: body.type,
      url: body.url,
      expiresAt,
    });
  }
}

