import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

import { DepartmentService } from "./departments.service";
import { type Department } from "./department.entity";
import { CreateDepartmentDTO } from "./departments.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";

@Controller("departments")
@ApiTags("Departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentService) {}

  @Get()
  @ApiOperation({ summary: "Lista de todos los departamentos" })
  @ApiBearerAuth()
  async getAll(): Promise<Department[]> {
    return await this.departmentsService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Lista de departamentos de una empresa" })
  @ApiBearerAuth()
  async getAllPerEnterprise(
    @Param("id", CheckObjectIdPipe) id,
  ): Promise<Department[]> {
    return await this.departmentsService.getAllPerEnterprise(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear un nuevo departamento" })
  @ApiBearerAuth()
  async create(@Body() payload: CreateDepartmentDTO): Promise<Department> {
    return await this.departmentsService.create(payload);
  }
}
