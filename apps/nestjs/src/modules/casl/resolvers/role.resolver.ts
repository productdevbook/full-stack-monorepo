import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateAdminRoleInput } from '../inputs/role/create-role.input'
import { RoleService } from '../services/role.service'
import { Role } from '@/entities'

@Resolver()
export class CalsRoleResolver {
  constructor(private readonly roleService: RoleService) {}

  // @Query(() => [Subject])
  // async subjects(): Promise<Subject[]> {
  //   return await this.subjectService.getAllSubjects()
  // }

  @Mutation(() => Role)
  async addAdminRoleToUser(@Args('data') data: CreateAdminRoleInput): Promise<Role> {
    return await this.roleService.createAdminRole(data)
  }
}
