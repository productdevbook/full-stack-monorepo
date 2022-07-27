import { Injectable } from '@nestjs/common'
import { CreatePermissionInput } from '../inputs/permission/create-permission.input'
import { UpdatePermissionInput } from '../inputs/permission/update-permission.input'
import { PermissionRepository } from '../repositories'
import { Permission } from '@/entities'

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async createPermission(createPermissionInput: CreatePermissionInput): Promise<Permission> {
    return await this.permissionRepository.createPermission(createPermissionInput)
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.getAllPermissions()
  }

  async getPermissionById(id: string): Promise<Permission> {
    return await this.permissionRepository.getPermissionById(id)
  }

  async deletePermission(id: string): Promise<string> {
    await this.deletePermission(id)
    return 'deleted'
  }

  async updatePermission(id: string, updatePermissionInput: UpdatePermissionInput): Promise<Permission> {
    return await this.updatePermission(id, updatePermissionInput)
  }
}
