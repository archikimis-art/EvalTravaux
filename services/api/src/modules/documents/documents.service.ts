import { Injectable } from "@nestjs/common";
import { DocumentStatus, ProfessionalDocumentType } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

type UpsertDocumentInput = {
  professionalId: string;
  type: ProfessionalDocumentType;
  url: string;
  expiresAt?: Date;
};

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async listForProfessional(professionalId: string) {
    return this.prisma.professionalDocument.findMany({
      where: { professionalId },
      orderBy: { createdAt: "desc" },
    });
  }

  async upsertDocument(input: UpsertDocumentInput) {
    const doc = await this.prisma.professionalDocument.upsert({
      where: {
        professionalId_type: {
          professionalId: input.professionalId,
          type: input.type,
        },
      },
      update: {
        url: input.url,
        expiresAt: input.expiresAt,
        status: DocumentStatus.PENDING,
      },
      create: {
        professionalId: input.professionalId,
        type: input.type,
        url: input.url,
        expiresAt: input.expiresAt,
      },
    });

    const docs = await this.prisma.professionalDocument.findMany({
      where: { professionalId: input.professionalId },
    });
    const hasValidDoc = docs.some((d) => d.status === DocumentStatus.VALID);

    await this.prisma.professional.update({
      where: { id: input.professionalId },
      data: { documentsValid: hasValidDoc },
    });

    return doc;
  }
}

