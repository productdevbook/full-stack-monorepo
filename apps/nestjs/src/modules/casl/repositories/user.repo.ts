import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { AddRoleInput } from '../inputs/add-role.input'
import { User } from '@/entities'
import { RoleRepository } from '@/modules/casl/repositories'

@Injectable()
export class CaslUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    private readonly roleRepo: RoleRepository,
  ) {
  }

  async addRoleToUser(addRoleInput: AddRoleInput): Promise<User> {
    const role = await this.roleRepo.getRoleById(addRoleInput.roleId)
    const user = await this.userRepo.findOneOrFail({ id: addRoleInput.userId }, { populate: ['roles'] })
    user.roles.add(role)
    await this.userRepo.persistAndFlush(role)
    return user
  }

  async removeRoleFromUser(addRoleInput: AddRoleInput): Promise<User> {
    const role = await this.roleRepo.getRoleById(addRoleInput.roleId)
    const user = await this.userRepo.findOneOrFail({ id: addRoleInput.userId }, { populate: ['roles'] })
    user.roles.remove(role)
    await this.userRepo.persistAndFlush(user)
    return user
  }
}

