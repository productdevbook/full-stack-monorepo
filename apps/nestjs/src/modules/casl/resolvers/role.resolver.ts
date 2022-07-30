import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateAdminRoleInput } from '../inputs/role/create-role.input'
import { RoleService } from '../services/role.service'
import { UpdateRoleInput } from '../inputs/role/update-role.input'
import { AddPermissionInput } from '../inputs/add-permission.input'
import { Role, User } from '@/entities'
import { AddRoleInput } from '../inputs/add-role.input'

@Resolver()
export class CalsRoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  async createAdminRole(@Args('data') data: CreateAdminRoleInput): Promise<Role> {
    return await this.roleService.createAdminRole(data)
  }

  @Mutation(() => Role)
  async addPermissionToRole(@Args('addPermission') data: AddPermissionInput): Promise<Role> {
    return await this.roleService.addPermissionToRole(data)
  }

  @Mutation(() => Role)
  async removePermissionFromRole(@Args('removePermission') data: AddPermissionInput): Promise<Role> {
    return await this.roleService.removePermissionFromRole(data)
  }

  @Mutation(() => Role)
  async addRoleToUser(@Args('addRole') data: AddRoleInput): Promise<User> {
    return await this.roleService.addRoleToUser(data)
  }

  @Mutation(() => Role)
  async removeRoleFromUser(@Args('addRole') data: AddRoleInput): Promise<User> {
    return await this.roleService.removeRoleFromUser(data)
  }

  @Query(() => [Role])
  async roles(): Promise<Role[]> {
    return await this.roleService.getAllRoles()
  }

  @Query(() => Role)
  async role(@Args('name') name: string): Promise<Role> {
    return await this.roleService.getRoleByName(name)
  }

  @Mutation(() => Role)
  async updateRole(@Args('id') id: string, @Args('data') data: UpdateRoleInput): Promise<Role> {
    return await this.roleService.updateRole(id, data)
  }

  @Mutation(() => Role)
  async deleteRole(@Args('id') id: string): Promise<Boolean> {
    await this.roleService.deleteRole(id)
    return true
  }
}
