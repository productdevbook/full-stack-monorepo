import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreatePermissionInput } from '../inputs/permission/create-permission.input'
import { UpdatePermissionInput } from '../inputs/permission/update-permission.input'
import { SubjectRepository } from './subject.repo'
import { Permission } from '@/entities'

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: EntityRepository<Permission>,
    private readonly subjectRepo: SubjectRepository,
  ) { }

  async createPermission(data: CreatePermissionInput): Promise<Permission> {
    const subject = await this.subjectRepo.getSubjectById(data.subjectId)
    const newPermission = this.permissionRepo.create({ subject: subject.toObject(), action: data.action })
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
