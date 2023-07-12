import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('enterprises')
export class EnterprisesController {
  @Get()
  getAll () {
    const enterprises: Array<{ name: string, image?: string, turn: string, telephone: string, address: string }> = [
      { name: 'Empresa 1', turn: 'Giro 1', telephone: 'Teléfono 1', address: 'Dirección 1' },
      { name: 'Empresa 2', turn: 'Giro 2', telephone: 'Teléfono 2', address: 'Dirección 2' },
      { name: 'Empresa 3', turn: 'Giro 3', telephone: 'Teléfono 3', address: 'Dirección 3' },
      { name: 'Empresa 4', turn: 'Giro 4', telephone: 'Teléfono 4', address: 'Dirección 4' }
    ]

    return enterprises
  }

  @Post()
  create () {
    return {
      message: 'Empresa creada'
    }
  }
}
