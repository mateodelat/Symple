import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EnterprisesController } from "./controllers/enterprises.controller";
import { EnterprisesService } from "./services/enterprises.service";
import { EnterpriseSchema, Enterprise } from "./entities/enterprise.entity";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Enterprise.name,
        schema: EnterpriseSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  exports: [EnterprisesService],
})
export class EnterprisesModule {}
