import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ReviewsService } from "./reviews.service";

class CreateReviewDto {
  leadId!: string;
  professionalId!: string;
  customerId!: string;
  rating!: number;
  comment?: string;
}

@Controller("reviews")
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() body: CreateReviewDto) {
    return this.reviewsService.createReview(body);
  }
}

