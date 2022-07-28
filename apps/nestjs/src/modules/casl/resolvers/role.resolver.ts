import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateAdminRoleInput } from '../inputs/role/create-role.input'
import { RoleService } from '../services/role.service'
import { UpdateRoleInput } from '../inputs/role/update-role.input'
import { Role, User } from '@/entities'

@Resolver()
export class CalsRoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role)
  async createAdminRole(@Args('data') data: CreateAdminRoleInput): Promise<Role> {
    return await this.roleService.createAdminRole(data)
  }

  @Mutation(() => Role)
  async addPermissionToRole(@Args('permissionId') perm: string, @Args('rolename') role: string): Promise<Role> {
    return await this.roleService.addPermissionToRole(role, perm)
  }

  @Mutation(() => Role)
  async removePermissionFromRole(@Args('permissionId') perm: string, @Args('rolename') role: string): Promise<Role> {
    return await this.roleService.removePermissionFromRole(role, perm)
  }

  @Mutation(() => Role)
  async addRoleToUser(@Args('rolename') role: string, @Args('username') user: string): Promise<User> {
    return await this.roleService.addRoleToUser(role, user)
  }

  @Mutation(() => Role)
  async removeRoleFromUser(@Args('rolename') role: string, @Args('username') user: string): Promise<User> {
    return await this.roleService.removeRoleFromUser(role, user)
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
