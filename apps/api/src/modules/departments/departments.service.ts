import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Department } from "./department.entity";
import { EnterprisesService } from "@modules/enterprises/enterprises.service";
import {
  UpdateDepartmentDTO,
  type CreateDepartmentDTO,
} from "./departments.dto";
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly DepartmentModel: Model<Department>,
    private readonly enterprisesService: EnterprisesService,
  ) {}

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
    if (!isValidObjectId) throw new Error("Invalid or malformed ObjectId.");
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

  /* async update(id: string, payload: UpdateDepartmentDTO): Promise<Department> {
    const elementToUpdate = await this.
  } */
}
