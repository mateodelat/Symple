import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { DepartmentsController } from "./departments.controller";
import { DepartmentService } from "./departments.service";
import { DepartmentSchema, Department } from "./department.entity";
import { EnterprisesModule } from "@modules/enterprises/enterprises.module";
import { RolesModule } from "../roles/roles.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
    ]),
    EnterprisesModule,
    forwardRef(() => RolesModule),
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentsModule {}
