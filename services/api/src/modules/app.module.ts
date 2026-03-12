import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { EmailModule } from "./email/email.module";
import { AiModule } from "./ai/ai.module";
import { LeadsModule } from "./leads/leads.module";
import { CreditsModule } from "./credits/credits.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ReviewsModule } from "./reviews/reviews.module";
import { DocumentsModule } from "./documents/documents.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailModule,
    AiModule,
    LeadsModule,
    CreditsModule,
    DashboardModule,
    ReviewsModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

