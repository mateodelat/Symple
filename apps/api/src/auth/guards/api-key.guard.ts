import {
  type CanActivate,
  type ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ConfigType } from "@nestjs/config";
import { type Observable } from "rxjs";
import { type Request } from "express";

import config from "@/config";
import { IS_PUBLIC } from "@constants/index";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC, context.getHandler());
    if (isPublic === true) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header("Authorization");
    const isValid = authHeader === this.configService.jwtSecret;

    if (!isValid) throw new UnauthorizedException("Invalid API Key");
    return isValid;
  }
}
