import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

import { EnterprisesModule } from "@modules/enterprises/enterprises.module";
import { DatabaseModule } from "./modules/database/database.module";
import { environments } from "./environments";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from './auth/auth.module';
import config from "./config";

const nodeEnv: string = process.env.NODE_ENV ?? ".env";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[nodeEnv],
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_CLUSTER: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    EnterprisesModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
