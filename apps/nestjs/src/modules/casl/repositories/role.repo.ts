import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreateAdminRoleInput } from '../inputs/role/create-role.input'
import { UpdateRoleInput } from '../inputs/role/update-role.input'
import { AddPermissionInput } from '../inputs/add-permission.input'
import { PermissionRepository } from './permission.repo'
import { Role } from '@/entities'

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: EntityRepository<Role>,
    private readonly permissionRepo: PermissionRepository,
  ) { }

  async createAdminRole(createRoleInput: CreateAdminRoleInput): Promise<Role> {
    const newRole = this.roleRepo.create(createRoleInput)
    await this.roleRepo.persistAndFlush(newRole)
    return newRole
  }

  async addPermissionToRole(data: AddPermissionInput): Promise<Role> {
    const permission = await this.permissionRepo.getPermissionById(data.permissionId)
    const role = await this.roleRepo.findOneOrFail({ id: data.roleId }, { populate: ['permissions'] })
    role.permissions.add(permission)
    await this.roleRepo.persistAndFlush(role)
    return role
  }

  async removePermissionFromRole(data: AddPermissionInput): Promise<Role> {
    const permission = await this.permissionRepo.getPermissionById(data.permissionId)
    const role = await this.roleRepo.findOneOrFail({ id: data.roleId }, { populate: ['permissions'] })
    role.permissions.remove(permission)
    await this.roleRepo.persistAndFlush(role)
    return role
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepo.findAll({ populate: ['permissions'] })
  }

  async getRoleByName(name: string): Promise<Role> {
    return await this.roleRepo.findOneOrFail({ name })
  }

  async getRoleById(id: string): Promise<Role> {
    return await this.roleRepo.findOneOrFail({ id })
  }

  async deleteRole(id: string): Promise<void> {
    await this.roleRepo.removeAndFlush({ id })
  }

  async updateRole(id: string, updateRoleInput: UpdateRoleInput): Promise<Role> {
    return await this.roleRepo.createQueryBuilder().where({ id }).update(updateRoleInput).execute()
  }
}
