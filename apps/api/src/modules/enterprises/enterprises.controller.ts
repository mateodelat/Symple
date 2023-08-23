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
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { EnterprisesService } from "./enterprises.service";
import { CreateEnterpriseDTO, UpdateEnterpriseDTO } from "./enterprises.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";
import { type Enterprise } from "./enterprise.entity";

@Controller("enterprises")
@ApiTags("Enterprises")
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Get()
  @ApiOperation({ summary: "Lista de empresas" })

  /*
    TODO: Implement pagination (check if it's necessary)
        @ApiQuery({ name: 'limit', type: limitParamDTO })
        @ApiQuery({ name: 'offset', type: offsetParamDTO })
        @ApiQuery({ name: 'turn', type: turnParamDTO })
  */
  async getAll() /* @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('turn') turn: string */
  : Promise<any> {
    return await this.enterprisesService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Recuperar una empresa" })
  async getOne(
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<Enterprise> {
    const element = this.enterprisesService.getOne(id);
    return await element;
  }

  @Post()
  @ApiOperation({ summary: "Crear empresa" })
  async create(@Body() payload: CreateEnterpriseDTO): Promise<Enterprise> {
    return await this.enterprisesService.create(payload);
  }

  @ApiOperation({ summary: "Actualizar empresa" })
  @Patch(":id")
  async update(
    @Body() payload: UpdateEnterpriseDTO,
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<Enterprise> {
    return await this.enterprisesService.update({ id, payload });
  }

  @ApiOperation({ summary: "Eliminar empresa" })
  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id", CheckObjectIdPipe) id: string): Promise<any> {
    return await this.enterprisesService.delete(id);
  }
}
