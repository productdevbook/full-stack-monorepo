import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
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

  async addRoleToUser(username: string, roleName: string): Promise<User> {
    const role = await this.roleRepo.getRoleByName(roleName)
    const user = await this.userRepo.findOneOrFail({ username })
    user.roles.add(role)
    await this.userRepo.flush()

    return user
  }

  async removeRoleFromUser(username: string, roleName: string): Promise<User> {
    const role = await this.roleRepo.getRoleByName(roleName)
    const user = await this.userRepo.findOneOrFail({ username })
    user.roles.remove(role)
    await this.userRepo.flush()

    return user
  }
}

