import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { type User } from "@/modules/users/user.entity";

@ApiTags("Authorization")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req: Request): any {
    const user: User = req.user as User;
    if (req.user !== undefined) return this.authService.generateJWT(user);
  }
}
