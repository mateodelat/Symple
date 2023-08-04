import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, type Types } from "mongoose";
import * as bcrypt from "bcrypt";

import { User } from "../entities/user.entity";
import { type CreateUserDTO, type UpdateUserDTO } from "../dtos/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async checkUserExits(id: Types.ObjectId): Promise<User> {
    const user = await this.UserModel.findById(id).exec();
    if (user === null)
      throw new NotFoundException(`User with id #${id.toString()} not found`);
    return user;
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.UserModel.find({ email }).exec();
    if (user.length > 0) throw new BadRequestException("Email already exists");
    return false;
  }

  async getAll(role: string): Promise<User[]> {
    let filter = {};

    if (role !== "") {
      filter = { role };
    }

    const users = await this.UserModel.find(filter)
      .populate("enterprises")
      .exec();
    return users;
  }

  async getOne(id: Types.ObjectId): Promise<User> {
    const user = await this.checkUserExits(id);
    return user;
  }

  async create(payload: CreateUserDTO): Promise<User | undefined> {
    const exists = await this.checkEmailExists(payload.email);
    if (!exists) {
      const { password, ...rest } = payload;
      const salt = 10;
      const passwordHash = await bcrypt.hash(password, salt);
      const object = { ...rest, password: passwordHash, createdAt: new Date() };
      const newUser = new this.UserModel(object);
      return await newUser.save();
    }
  }

  async update({
    id,
    payload,
  }: {
    id: Types.ObjectId;
    payload: UpdateUserDTO;
  }): Promise<User> {
    const user = await this.checkUserExits(id);
    user.$set(payload);
    return await user.save();
  }

  async delete(id: Types.ObjectId): Promise<{ message: string }> {
    const user = await this.checkUserExits(id);
    await user.deleteOne();
    return { message: `User with id #${id.toString()} deleted successfully` };
  }
}
