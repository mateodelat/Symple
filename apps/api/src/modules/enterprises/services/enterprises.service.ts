import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Enterprise } from '../entities/enterprise.entity'
import { CreateEnterpriseDTO, UpdateEnterpriseDTO } from '../dtos/enterprises.dto'

@Injectable()
export class EnterprisesService {
  constructor (
    @InjectModel(Enterprise.name) private readonly enterpriseModel: Model<Enterprise>
  ) {}

  async checkEnterpriseExists (id: string) {
    const element = await this.enterpriseModel.findById(id).exec()
    if (element === null) throw new NotFoundException(`Enterprise with id #${id} not found`)
    return element
  }

  async getAll () {
    const elements = this.enterpriseModel.find({}).exec()
    return await elements
  }

  async getOne (id: string) {
    const element = await this.checkEnterpriseExists(id)
    return element
  }

  async create (payload: CreateEnterpriseDTO) {
    const object = { ...payload, createdAt: new Date() }
    const newEnterprise = new this.enterpriseModel(object)
    return await newEnterprise.save()
  }

  async update ({ id, payload }: { id: string, payload: UpdateEnterpriseDTO }) {
    const elementToUpdate = await this.checkEnterpriseExists(id)
    elementToUpdate.$set(payload)
    return await elementToUpdate.save()
  }

  async delete (id: string) {
    const element = await this.checkEnterpriseExists(id)
    await element.deleteOne()
    return { message: `Enterprise with id #${id} deleted successfully` }
  }
}
