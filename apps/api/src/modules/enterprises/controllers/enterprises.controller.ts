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

import { EnterprisesService } from "../services/enterprises.service";
import {
  CreateEnterpriseDTO,
  UpdateEnterpriseDTO,
} from "../dtos/enterprises.dto";
import { CheckObjectIdPipe } from "@/common/check-object-id/check-object-id.pipe";

@ApiTags("Enterprises")
@Controller("enterprises")
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
  async getOne(@Param("id", CheckObjectIdPipe) id: string): Promise<any> {
    const element = this.enterprisesService.getOne(id);
    return await element;
  }

  @Post()
  async create(@Body() payload: CreateEnterpriseDTO): Promise<any> {
    return await this.enterprisesService.create(payload);
  }

  @Put(":id")
  async update(
    @Body() payload: UpdateEnterpriseDTO,
    @Param("id", CheckObjectIdPipe) id: string,
  ): Promise<any> {
    return await this.enterprisesService.update({ id, payload });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id", CheckObjectIdPipe) id: string): Promise<any> {
    return await this.enterprisesService.delete(id);
  }
}
