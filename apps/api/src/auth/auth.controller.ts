import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";

import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { ApiTags } from "@nestjs/swagger";
import { type UserToken } from "@/types/Auth";

@Controller("auth")
@ApiTags("Authorization")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req): Promise<UserToken> {
    return await this.authService.login(req.user);
  }
}
