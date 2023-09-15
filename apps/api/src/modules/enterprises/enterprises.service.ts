import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, type Types, isValidObjectId } from "mongoose";

import { Enterprise } from "./enterprise.entity";
import { UsersService } from "@modules/users/users.service";
import {
  type CreateEnterpriseDTO,
  type UpdateEnterpriseDTO,
} from "./enterprises.dto";
import { type QueryGetAll } from "@/types/models/Enterprise";

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel(Enterprise.name)
    private readonly EnterpriseModel: Model<Enterprise>,
    private readonly usersService: UsersService,
  ) {}

  async checkEnterpriseExists(id: string): Promise<Enterprise> {
    const element = await this.EnterpriseModel.findById(id).exec();
    if (element === null)
      throw new NotFoundException(`Enterprise with id #${id} not found`);
    return element;
  }

  checkObjectId(id: Types.ObjectId): boolean {
    return isValidObjectId(id);
  }

  async getAll({ limit, offset, user }: QueryGetAll): Promise<Enterprise[]> {
    let filter = {};
    if (user.role !== "admin") {
      filter = {
        admins: user.id,
      };
    }
    const elements = await this.EnterpriseModel.find(filter)
      .populate("admins", {
        name: 1,
        lastName: 1,
        email: 1,
        role: 1,
        createdAt: 1,
      })
      .populate("departments", {
        name: 1,
        createdAt: 1,
      })
      .skip(offset)
      .limit(limit)
      .exec();
    return elements;
  }

  async getOne(id: string): Promise<Enterprise> {
    const element = await this.EnterpriseModel.findById(id)
      .populate("admins", {
        name: 1,
        lastName: 1,
        email: 1,
        role: 1,
        createdAt: 1,
      })
      .exec();
    if (element === null)
      throw new NotFoundException(`Enterprise with id #${id} not found`);
    return element;
  }

  async create(payload: CreateEnterpriseDTO): Promise<Enterprise> {
    const areValidObjectIds = payload.admins.every((id: Types.ObjectId) =>
      this.checkObjectId(id),
    );
    if (!areValidObjectIds)
      throw new BadRequestException("Invalid or malformed ObjectId.");
    const object = { ...payload, createdAt: new Date() };
    const element = new this.EnterpriseModel(object);
    const users = payload.admins;

    for (const id of users) {
      await this.usersService.checkUserExits(id);
    }

    const newEnterprise = await element.save();
    for (const id of payload.admins) {
      const user = await this.usersService.checkUserExits(id);
      const enterprises = user.enterprises;
      await this.usersService.update({
        id,
        payload: { enterprises: [...enterprises, newEnterprise._id] },
      });
    }
    return newEnterprise;
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateEnterpriseDTO;
  }): Promise<Enterprise> {
    const elementToUpdate = await this.checkEnterpriseExists(id);
    elementToUpdate.$set(payload);
    if (payload?.admins != null && payload.admins.length > 0) {
      for (const userId of payload.admins) {
        const user = await this.usersService.checkUserExits(userId);
        await this.usersService.update({
          id: userId,
          payload: { enterprises: [...user.enterprises, userId] },
        });
      }
    }
    return await elementToUpdate.save();
  }

  async delete(id: string): Promise<{ message: string }> {
    const element = await this.checkEnterpriseExists(id);
    await element.deleteOne();
    return { message: `Enterprise with id #${id} deleted successfully` };
  }
}
