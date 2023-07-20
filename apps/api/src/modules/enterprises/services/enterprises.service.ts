import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, isValidObjectId } from 'mongoose'

import { Enterprise } from '../entities/enterprise.entity'
import { UsersService } from '@/modules/users/services/users.service'
import { CreateEnterpriseDTO, UpdateEnterpriseDTO } from '../dtos/enterprises.dto'

@Injectable()
export class EnterprisesService {
  constructor (
    @InjectModel(Enterprise.name) private readonly EnterpriseModel: Model<Enterprise>,
    private readonly usersService: UsersService
  ) {}

  async checkEnterpriseExists (id: string): Promise<Enterprise> {
    const element = await this.EnterpriseModel.findById(id).exec()
    if (element === null) throw new NotFoundException(`Enterprise with id #${id} not found`)
    return element
  }

  checkObjectId (id: string): boolean {
    return isValidObjectId(id)
  }

  async getAll (): Promise<Enterprise[]> {
    const elements = this.EnterpriseModel.find({}).exec()
    return await elements
  }

  async getOne (id: string): Promise<Enterprise> {
    const element = await this.checkEnterpriseExists(id)
    return element
  }

  async create (payload: CreateEnterpriseDTO): Promise<Enterprise> {
    const areValidObjectIds = payload.admins.every((id: string) => this.checkObjectId(id))
    if (!areValidObjectIds) throw new BadRequestException('Invalid or malformed ObjectId.')
    const object = { ...payload, createdAt: new Date() }
    const element = new this.EnterpriseModel(object)
    const newEnterprise = await element.save()
    for (const id of payload.admins) {
      const user = await this.usersService.checkUserExits(id)
      user.enterprises.push(newEnterprise._id)
      await user.save()
    }
    return newEnterprise
  }

  async update ({ id, payload }: { id: string, payload: UpdateEnterpriseDTO }): Promise<Enterprise> {
    const elementToUpdate = await this.checkEnterpriseExists(id)
    elementToUpdate.$set(payload)
    return await elementToUpdate.save()
  }

  async delete (id: string): Promise<{ message: string }> {
    const element = await this.checkEnterpriseExists(id)
    await element.deleteOne()
    return { message: `Enterprise with id #${id} deleted successfully` }
  }
}
