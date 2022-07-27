import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreateRoleInput } from '../inputs/role/create-role.input'
import { Role } from '@/entities'
import { UserRepository } from '@/modules/user/repositories/user.repo'

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: EntityRepository<Role>,
    private readonly userRepo: UserRepository,
  ) { }

  async addRoleToUser(username: string, roleId: string): Promise<void> {
    const user = await this.userRepo.findOne(username)
    const role = await this.roleRepo.findOne({ id: roleId })
    if (!role || !user)
      throw Error
    user?.roles.add(role)
  }

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    const newRole = this.roleRepo.create(createRoleInput)
    await this.roleRepo.persistAndFlush(newRole)
    return newRole
  }

  async deleteRole(id: number): Promise<void> {
    await this.roleRepo.removeAndFlush({ id })
  }
}
