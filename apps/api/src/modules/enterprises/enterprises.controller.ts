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
  Query,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";

import { EnterprisesService } from "./enterprises.service";
import { CreateEnterpriseDTO, UpdateEnterpriseDTO } from "./enterprises.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";
import { type Enterprise } from "./enterprise.entity";
import {
  limitParamDTO,
  offsetParamDTO,
  turnParamDTO,
} from "@/common/dtos/queryParams";

@Controller("enterprises")
@ApiTags("Enterprises")
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Get()
  @ApiOperation({ summary: "Lista de empresas" })
  @ApiBearerAuth()
  @ApiQuery({ name: "limit", type: limitParamDTO })
  @ApiQuery({ name: "offset", type: offsetParamDTO })
  @ApiQuery({ name: "turn", type: turnParamDTO })
  async getAll(
    @Query("limit") limit: number = 30,
    @Query("offset") offset: number = 0,
    @Req() req,
  ): Promise<any> {
    return await this.enterprisesService.getAll({
      limit,
      offset,
      user: req.user,
    });
  }

  @Get(":id")
  @ApiOperation({ summary: "Recuperar una empresa" })
  @ApiBearerAuth()
  async getOne(
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<Enterprise> {
    return await this.enterprisesService.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear empresa" })
  @ApiBearerAuth()
  async create(@Body() payload: CreateEnterpriseDTO): Promise<Enterprise> {
    return await this.enterprisesService.create(payload);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar empresa" })
  @ApiBearerAuth()
  async update(
    @Body() payload: UpdateEnterpriseDTO,
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<Enterprise> {
    return await this.enterprisesService.update({ id, payload });
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar empresa" })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id", CheckObjectIdPipe) id: string): Promise<any> {
    return await this.enterprisesService.delete(id);
  }
}
