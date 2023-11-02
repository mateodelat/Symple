import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

import { RolesService } from "./roles.service";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";
import { type Role } from "./role.entity";
import { CreateRoleDTO, UpdateRoleDTO } from "./roles.dto";

@Controller("roles")
@ApiTags("Roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get("")
  @ApiOperation({ summary: "Lista de roles" })
  @ApiBearerAuth()
  async getAll(): Promise<Role[]> {
    return await this.rolesService.getAll();
  }

  @Get(":departmentId")
  @ApiOperation({ summary: "Lista de roles por departamento" })
  @ApiBearerAuth()
  async getAllPerDepartment(
    @Param("departmentId", CheckObjectIdPipe) department: string,
  ): Promise<any> {
    return await this.rolesService.getAllPerDepartment(department);
  }

  @Get(":departmentId/:roleId")
  @ApiOperation({ summary: "Recuperar un rol de un departamento" })
  @ApiBearerAuth()
  async getOne(
    @Param("departmentId", CheckObjectIdPipe) department: string,
    @Param("roleId", CheckObjectIdPipe) role: string,
  ): Promise<Role> {
    return await this.rolesService.getOnePerDepartment({ department, role });
  }

  @Post()
  @ApiOperation({ summary: "Crear rol" })
  @ApiBearerAuth()
  async create(@Body() payload: CreateRoleDTO): Promise<Role> {
    return await this.rolesService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar rol" })
  @ApiBearerAuth()
  async update(
    @Body() payload: UpdateRoleDTO,
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<Role> {
    return await this.rolesService.update(id, payload);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar rol" })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<{ message: string }> {
    return await this.rolesService.delete(id);
  }
}
