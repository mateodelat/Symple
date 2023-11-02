import { Module, forwardRef } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { RoleSchema, Role } from "./role.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { DepartmentsModule } from "../departments/departments.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
    forwardRef(() => DepartmentsModule),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
