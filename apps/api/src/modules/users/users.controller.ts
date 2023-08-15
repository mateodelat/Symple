import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { UsersService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";
import { Types } from "mongoose";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOperation({ summary: "Lista de usuarios" })
  async getAll(@Query("role") role: string = ""): Promise<any> {
    return await this.usersService.getAll(role);
  }

  @Get(":id")
  async getOne(
    @Param("id", CheckObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    const element = this.usersService.getOne(id);
    return await element;
  }

  @Post()
  async create(@Body() payload: CreateUserDTO): Promise<any> {
    return await this.usersService.create(payload);
  }

  @Put(":id")
  async update(
    @Body() payload: UpdateUserDTO,
    @Param("id", CheckObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return await this.usersService.update({ id, payload });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param("id", CheckObjectIdPipe) id: Types.ObjectId,
  ): Promise<any> {
    return await this.usersService.delete(id);
  }
}
