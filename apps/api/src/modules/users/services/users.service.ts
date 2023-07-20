import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "../entities/user.entity";
import { type CreateUserDTO, type UpdateUserDTO } from "../dtos/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async checkUserExits(id: string): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (user === null)
      throw new NotFoundException(`Enterprise with id #${id} not found`);
    return user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.UserModel.find({ email }).exec();
    if (user.length > 0) throw new BadRequestException("Email already exists");
    return false;
  }

  async getAll(): Promise<User[]> {
    const users = await this.UserModel.find({}).exec();
    return users;
  }

  async getOne(id: string): Promise<User> {
    const user = await this.checkUserExits(id);
    return user;
  }

  async create(payload: CreateUserDTO): Promise<User | undefined> {
    const exists = await this.checkEmailExists(payload.email);
    if (!exists) {
      const object = { ...payload, createdAt: new Date() };
      const newUser = new this.UserModel(object);
      return await newUser.save();
    }
  }

  async update({
    id,
    payload,
  }: {
    id: string;
    payload: UpdateUserDTO;
  }): Promise<User> {
    const user = await this.checkUserExits(id);
    user.$set(payload);
    return await user.save();
  }

  async delete(id: string): Promise<{ message: string }> {
    const user = await this.checkUserExits(id);
    await user.deleteOne();
    return { message: `User with id #${id} deleted successfully` };
  }
}
