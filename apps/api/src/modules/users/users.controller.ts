import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";
import { Types } from "mongoose";
import { Public } from "@/auth/decorators/public.decorator";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Recuperar todos los usuarios" })
  @ApiBearerAuth()
  async getAll(@Query("role") role: string = ""): Promise<any> {
    return await this.usersService.getAll(role);
  }

  @Get(":id")
  @ApiOperation({ summary: "Recuperar usuarios" })
  @ApiBearerAuth()
  async getOne(
    @Param("id", CheckObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const element = this.usersService.getOne(id);
    return await element;
  }

  @Post()
  @Public()
  @ApiOperation({ summary: "Crear usuario" })
  @ApiBearerAuth()
  async create(@Body() payload: CreateUserDTO): Promise<any> {
    return await this.usersService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar usuario" })
  @ApiBearerAuth()
  async update(
    @Body() payload: UpdateUserDTO,
    @Param("id", CheckObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return await this.usersService.update({ id, payload });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar usuario" })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param("id", CheckObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return await this.usersService.delete(id);
  }
}
