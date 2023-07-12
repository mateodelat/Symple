import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpCode
} from '@nestjs/common'
import { EnterprisesService } from '../../services/enterprises/enterprises.service'
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe'
import { CreateEnterpriseDTO, UpdateEnterpriseDTO } from '../../dtos/enterprises.dto'

@Controller('enterprises')
export class EnterprisesController {
  constructor (private readonly enterprisesService: EnterprisesService) {}

  @Get()
  getAll (
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('turn') turn: string
  ) {
    return this.enterprisesService.getAll({ limit, offset, turn })
  }

  @Get(':id')
  getOne (@Param('id', ParseIntPipe) id: number) {
    return this.enterprisesService.getOne(id)
  }

  @Post()
  create (@Body() payload: CreateEnterpriseDTO) {
    return this.enterprisesService.create(payload)
  }

  @Put(':id')
  update (@Body() payload: UpdateEnterpriseDTO, @Param('id', ParseIntPipe) id: number) {
    return this.enterprisesService.update({ payload, id })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete (@Param('id', ParseIntPipe) id: number) {
    return this.enterprisesService.delete(id)
  }
}
