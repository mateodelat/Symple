import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { type ConfigType } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { UsersModule } from "@modules/users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./auth.controller";
import config from "@/config";
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: "1d",
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
