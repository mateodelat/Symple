import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Department } from "./department.entity";
import { EnterprisesService } from "@modules/enterprises/enterprises.service";
import {
  type UpdateDepartmentDTO,
  type CreateDepartmentDTO,
} from "./departments.dto";
import { type CheckUserHasAccessToDepartmentProps } from "@/types/models/Department";
@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private readonly DepartmentModel: Model<Department>,
    private readonly enterprisesService: EnterprisesService,
  ) {}

  async checkDepartmentExists(
    name: string,
    enterprise: string,
  ): Promise<Department | null> {
    const element = await this.DepartmentModel.findOne({
      name,
      enterprise,
    }).exec();
    return element;
  }

  async checkDepartmentExistsById(id: string): Promise<Department> {
    const element = await this.DepartmentModel.findById(id).exec();
    if(element === null) throw new BadRequestException(`Department with id #${id} not found`);
    return element;
  }

  async getAll(): Promise<Department[]> {
    const elements = await this.DepartmentModel.find({}).populate("roles").exec();
    return elements;
  }

  async getAllPerEnterprise(id: string): Promise<Department[]> {
    const elements = await this.DepartmentModel.find({ enterprise: id }).populate("roles").exec();
    return elements;
  }

  async create(payload: CreateDepartmentDTO): Promise<Department> {
    const isValidObjectId = this.enterprisesService.checkObjectId(
      payload.enterprise,
    );
    const exists = await this.checkDepartmentExists(
      payload.name,
      payload.enterprise.toString(),
    );
    if (!isValidObjectId) throw new Error("Invalid or malformed ObjectId.");
    if (exists !== null)
      throw new BadRequestException("El departamento ya existe.");
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

  async delete(id: string): Promise<{ message: string }> {
    const element = await this.checkDepartmentExistsById(id);
    await element.deleteOne();
    return { message: `Departamento con id #${id} eliminado con éxito` };
  }

    async checkUserHasAccessToDepartment({ user, department }: CheckUserHasAccessToDepartmentProps): Promise<boolean> {
    const elements: Department[] = []
    
    for(const enterprise of user?.enterprises ?? []) {
      const data = await this.getAllPerEnterprise(enterprise.toString())
      elements.push(...data)
    }

    const departmentIds = elements.map(department => department.id.toString())
    return departmentIds.includes(department)
  }
}
