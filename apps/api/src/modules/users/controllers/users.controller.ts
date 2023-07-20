import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { UsersService } from "../services/users.service";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @ApiOperation({ summary: "Lista de empresas" })
  async getAll(): Promise<any> {
    return await this.usersService.getAll();
  }

  @Get(":id")
  async getOne(@Param("id", CheckObjectIdPipe) id: string): Promise<any> {
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
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<any> {
    return await this.usersService.update({ id, payload });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id", CheckObjectIdPipe) id: string): Promise<any> {
    return await this.usersService.delete(id);
  }
}
