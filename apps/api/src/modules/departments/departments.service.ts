import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Department } from "./department.entity";
import { EnterprisesService } from "@modules/enterprises/enterprises.service";
import {
  type UpdateDepartmentDTO,
  type CreateDepartmentDTO,
} from "./departments.dto";
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly DepartmentModel: Model<Department>,
    private readonly enterprisesService: EnterprisesService,
  ) {}

  async checkDepartmentExists(name: string): Promise<Department | null> {
    const element = await this.DepartmentModel.findOne({ name }).exec();
    return element;
  }

  async getAll(): Promise<Department[]> {
    const elements = await this.DepartmentModel.find({}).exec();
    return elements;
  }

  async getAllPerEnterprise(id: string): Promise<Department[]> {
    const elements = await this.DepartmentModel.find({ enterprise: id }).exec();
    return elements;
  }

  async create(payload: CreateDepartmentDTO): Promise<Department> {
    const isValidObjectId = this.enterprisesService.checkObjectId(
      payload.enterprise,
    );
    const exists = await this.checkDepartmentExists(payload.name);
    if (!isValidObjectId) throw new Error("Invalid or malformed ObjectId.");
    if (exists === null)
      throw new BadRequestException("Department already exists.");
    const object = { ...payload, createdAt: new Date() };

    const element = new this.DepartmentModel(object);

    const newDepartment = await element.save();
    const enterprise = await this.enterprisesService.checkEnterpriseExists(
      payload.enterprise.toString(),
    );
    await this.enterprisesService.update({
      id: enterprise.id,
      payload: { departments: [...enterprise.departments, newDepartment._id] },
    });

    return newDepartment;
  }

  async update(id: string, payload: UpdateDepartmentDTO): Promise<any> {
    const element = await this.DepartmentModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).exec();
    return element;
  }
}
