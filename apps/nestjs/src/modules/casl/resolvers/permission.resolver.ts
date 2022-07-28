import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreatePermissionInput } from '../inputs/permission/create-permission.input'
import { PermissionService } from '../services/permission.service'
import { UpdatePermissionInput } from '../inputs/permission/update-permission.input'
import { Permission } from '@/entities'

@Resolver()
export class CalsPermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => [Permission])
  async permissions(): Promise<Permission[]> {
    return await this.permissionService.getAllPermissions()
  }

  @Mutation(() => Permission)
  async createPermission(@Args('subject_id') subject_id: string, @Args('data') data: CreatePermissionInput): Promise<Permission> {
    return await this.permissionService.createPermission(subject_id, data)
  }

  @Mutation(() => Permission)
  async updatePermission(@Args('id') id: string, @Args('data') data: UpdatePermissionInput): Promise<Permission> {
    return await this.permissionService.updatePermission(id, data)
  }

  @Mutation(() => Permission)
  async deletePermission(@Args('id') id: string): Promise<Boolean> {
    await this.permissionService.deletePermission(id)
    return true
  }
}
