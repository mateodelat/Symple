import { ForbiddenException, Injectable, Scope, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { Role } from './role.entity';
import { type GetOneParams } from '@/types/models/Role';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { DepartmentService } from '../departments/departments.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { type UserAuth } from '@/types/Auth';
import { type UpdateRoleDTO, type CreateRoleDTO } from './roles.dto';

@Injectable({scope: Scope.REQUEST})
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly RoleModel: Model<Role>,
    private readonly departmentsService: DepartmentService,
    @Inject(REQUEST) private readonly request: Request
    ) {}

  async checkUserHasAccessToDepartment(department: string): Promise<void> {
    const user: UserAuth = this.request.user as UserAuth
    const hasAccess = await this.departmentsService.checkUserHasAccessToDepartment({user, department})
    if(user.role !== 'admin' || hasAccess) throw new ForbiddenException('No tienes permisos para acceder a este recurso')
  }

  async checkRoleExists (id: string): Promise<Role> {
    const element = await this.RoleModel.findById(id)
    if(element === null) throw new NotFoundException('No se encontró el rol con el id proporcionado.')
    return element
  }

  async getAll(): Promise<Role[]> {
    const roles = await this.RoleModel.find()

    return roles
  }

  async getAllPerDepartment(department: string): Promise<Role[]> {
    await this.checkUserHasAccessToDepartment(department)
    const roles = await this.RoleModel.find({ department })

    return roles
  }

  async getOnePerDepartment({department, role}: GetOneParams): Promise<Role> {
    await this.checkUserHasAccessToDepartment(department)
    return await this.checkRoleExists(role)
  }

  async create(payload: CreateRoleDTO): Promise<Role> {
    const departmentId = payload.department.toString()
    
    if(!isValidObjectId(departmentId)) throw new BadRequestException('Invalid or malformed ObjectId.')
    
    await this.checkUserHasAccessToDepartment(departmentId)

    const element = new this.RoleModel({...payload, createdAt: new Date()})

    const newRole = await element.save()
    const department = await this.departmentsService.checkDepartmentExistsById(departmentId)
    
    const roles = department?.roles instanceof Array ? [...department.roles, newRole.id] : [newRole.id]
    await this.departmentsService.update(departmentId, { roles })
    return newRole
  }

  async update(id: string, payload: UpdateRoleDTO): Promise<Role> {
    const departmentId = payload.department.toString()
    await this.checkUserHasAccessToDepartment(departmentId)
    const element = await this.RoleModel.findByIdAndUpdate(id, payload, {
      new: true
    }).exec()

    if(element === null) throw new NotFoundException('No se encontró el rol con el id proporcionado.')

    return element
  }

  async delete(id: string): Promise<{ message: string }> {
    const element = await this.checkRoleExists(id)
    await element.deleteOne()

    return { message: `Rol con id #${id} eliminado con éxito` }
  }
}
