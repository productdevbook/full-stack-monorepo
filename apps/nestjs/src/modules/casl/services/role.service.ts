import { Injectable } from '@nestjs/common'
import { CreateRoleInput } from '../inputs/role/create-role.input'
import { UpdateRoleInput } from '../inputs/role/update-role.input'
import { RoleRepository } from '../repositories'
import { Role } from '@/entities'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    return await this.roleRepository.createRole(createRoleInput)
  }

  async addPermissionToRole(roleName: string, permissionId: string): Promise<Role> {
    return await this.roleRepository.addPermissionToRole(roleName, permissionId)
  }

  async removePermissionFromRole(roleName: string, permissionId: string): Promise<Role> {
    return await this.roleRepository.removePermissionFromRole(roleName, permissionId)
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.getAllRoles()
  }

  async getRoleByName(name: string): Promise<Role> {
    return await this.roleRepository.getRoleByName(name)
  }

  async getRoleById(id: string): Promise<Role> {
    return await this.roleRepository.getRoleById(id)
  }

  async deleteRole(id: string): Promise<string> {
    await this.deleteRole(id)
    return 'deleted'
  }

  async updateRole(id: string, updateRoleInput: UpdateRoleInput): Promise<Role> {
    return await this.updateRole(id, updateRoleInput)
  }
}
