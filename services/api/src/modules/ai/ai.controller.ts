import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";

export class EstimateProjectDto {
  description?: string;
  workType?: string;
  surface?: number;
  budget?: string;
  trade?: string;
  city?: string;
}

@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post("estimate-project")
  async estimateProject(@Body() body: EstimateProjectDto) {
    return this.aiService.estimateProject(body);
  }
}
