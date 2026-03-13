import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
  const origins = corsOrigin.split(",").map((o) => o.trim()).filter(Boolean);
  app.enableCors({ origin: origins.length > 1 ? origins : origins[0] || "http://localhost:3000" });
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
