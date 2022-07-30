import { Injectable } from '@nestjs/common'
import { CreateAdminRoleInput } from '../inputs/role/create-role.input'
import { UpdateRoleInput } from '../inputs/role/update-role.input'
import { CaslUserRepository, RoleRepository } from '../repositories'
import { AddPermissionInput } from '../inputs/add-permission.input'
import { AddRoleInput } from '../inputs/add-role.input'
import { Role, User } from '@/entities'

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository,
    private readonly userRepo: CaslUserRepository) {}

  async createAdminRole(createRoleInput: CreateAdminRoleInput): Promise<Role> {
    return await this.roleRepository.createAdminRole(createRoleInput)
  }

  async addPermissionToRole(data: AddPermissionInput): Promise<Role> {
    return await this.roleRepository.addPermissionToRole(data)
  }

  async removePermissionFromRole(data: AddPermissionInput): Promise<Role> {
    return await this.roleRepository.removePermissionFromRole(data)
  }

  async addRoleToUser(data: AddRoleInput): Promise<User> {
    return await this.userRepo.addRoleToUser(data)
  }

  async removeRoleFromUser(data: AddRoleInput): Promise<User> {
    return await this.userRepo.removeRoleFromUser(data)
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
