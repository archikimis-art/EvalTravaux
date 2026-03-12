import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

type CreateReviewInput = {
  leadId: string;
  professionalId: string;
  customerId: string;
  rating: number;
  comment?: string;
};

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(input: CreateReviewInput) {
    if (input.rating < 1 || input.rating > 5) {
      throw new BadRequestException("Rating must be between 1 and 5");
    }

    const review = await this.prisma.review.create({
      data: input,
    });

    await this.recalculateProfessionalRating(input.professionalId);

    return review;
  }

  async recalculateProfessionalRating(professionalId: string) {
    const aggregate = await this.prisma.review.aggregate({
      where: { professionalId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await this.prisma.professional.update({
      where: { id: professionalId },
      data: {
        averageRating: aggregate._avg.rating ?? 0,
        ratingCount: aggregate._count.rating,
      },
    });
  }
}

