import { Injectable, NotFoundException } from '@nestjs/common'
import { Enterprise } from '../../entities/enterprise.entity'
import { CreateEnterpriseDTO, UpdateEnterpriseDTO } from '../../dtos/enterprises.dto'

@Injectable()
export class EnterprisesService {
  private enterprises: Enterprise[] = [
    { name: 'Empresa 1', turn: 'Giro 1', telephone: 'Teléfono 1', address: 'Dirección 1', id: 1 },
    { name: 'Empresa 2', turn: 'Giro 2', telephone: 'Teléfono 2', address: 'Dirección 2', id: 2 },
    { name: 'Empresa 3', turn: 'Giro 3', telephone: 'Teléfono 3', address: 'Dirección 3', id: 3 },
    { name: 'Empresa 4', turn: 'Giro 4', telephone: 'Teléfono 4', address: 'Dirección 4', id: 4 }
  ]

  findIndex (id: number) {
    const index = this.enterprises.findIndex(enterprise => enterprise.id === id)
    if (index === -1) throw new NotFoundException(`Enterprise with the id '${id}' not found`)
    return index
  }

  getAll ({ limit, offset, turn }: { limit: number, offset: number, turn: string }) {
    const elements = this.enterprises.slice(offset, offset + limit)
    if (turn !== undefined) return elements.filter(enterprise => enterprise.turn === turn)
    return elements
  }

  getOne (id: number) {
    const index = this.findIndex(id)
    return this.enterprises[index]
  }

  create (payload: CreateEnterpriseDTO) {
    const id = Math.max(...this.enterprises.map(el => el.id)) + 1
    const newEnterprise = {
      id,
      ...payload
    }
    this.enterprises = [...this.enterprises, newEnterprise]
    return newEnterprise
  }

  update ({ id, payload }: { id: number, payload: UpdateEnterpriseDTO }) {
    const index = this.findIndex(id)
    this.enterprises[index] = {
      ...this.enterprises[index],
      ...payload
    }
    return this.enterprises[index]
  }

  delete (id: number) {
    const index = this.findIndex(id)
    this.enterprises.splice(index, 1)
  }
}
