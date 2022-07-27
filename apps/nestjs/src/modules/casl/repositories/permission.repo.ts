import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreatePermissionInput } from '../inputs/permission/create-permission.input'
import { UpdatePermissionInput } from '../inputs/permission/update-permission.input'
import { Permission } from '@/entities'

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: EntityRepository<Permission>,
  ) { }

  async createPermission(createPermissionInput: CreatePermissionInput): Promise<Permission> {
    const newPermission = this.permissionRepo.create(createPermissionInput)
    await this.permissionRepo.persistAndFlush(newPermission)
    return newPermission
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this.permissionRepo.findAll()
  }

  async getPermissionById(id: string): Promise<Permission> {
    return await this.permissionRepo.findOneOrFail({ id })
  }

  async deletePermission(id: number): Promise<void> {
    await this.permissionRepo.removeAndFlush({ id })
  }

  async updatePermission(id: string, updatePermissionInput: UpdatePermissionInput): Promise<Permission> {
    return await this.permissionRepo.createQueryBuilder().where({ id }).update(updatePermissionInput).execute()
  }
}
