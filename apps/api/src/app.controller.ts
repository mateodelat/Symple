import { Controller, Get, UseGuards } from "@nestjs/common";

import { ApiKeyGuard } from "@guards/api-key.guard";
import { Public } from "@decorators/public.decorator";

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "Hola Mundo!";
  }

  @Get("new")
  @Public()
  newEndpoint(): string {
    return "new endpoint";
  }
}
