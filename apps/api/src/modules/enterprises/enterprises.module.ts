import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { EnterprisesController } from "./enterprises.controller";
import { EnterprisesService } from "./enterprises.service";
import { EnterpriseSchema, Enterprise } from "./enterprise.entity";
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
