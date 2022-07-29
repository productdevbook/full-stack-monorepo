import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreateAdminRoleInput } from '../inputs/role/create-role.input'
import { UpdateRoleInput } from '../inputs/role/update-role.input'
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

  // doesnt work
  async addPermissionToRole(roleName: string, permissionId: string): Promise<Role> {
    const role = await this.getRoleByName(roleName)
    const permission = await this.permissionRepo.getPermissionById(permissionId)

    return await this.roleRepo.createQueryBuilder()
      .update({ permissions: [...role.permissions, permission] })
      .where({ name: roleName })
      .execute()
  }

  async removePermissionFromRole(roleName: string, permissionId: string): Promise<Role> {
    const permission = await this.permissionRepo.getPermissionById(permissionId)
    const role = await this.getRoleByName(roleName)
    const permissions = role.permissions.toArray()

    return await this.roleRepo.createQueryBuilder()
      .where({ name: roleName })
      .update({ permissions: permissions.filter(data => data.action !== permission.action) })
      .execute()
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepo.findAll()
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