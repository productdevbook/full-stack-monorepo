import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { User } from '@/entities'
import { RoleRepository } from '@/modules/casl/repositories'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
    private readonly roleRepo: RoleRepository,
  ) {
  }

  public async findOne(username: string) {
    const user = await this.userRepo.findOneOrFail({ username })
    return user
  }

  async addRoleToUser(username: string, roleName: string): Promise<User> {
    const role = await this.roleRepo.getRoleByName(roleName)
    const user = await this.userRepo.findOneOrFail({ username })
    const updatedUser = this.userRepo.assign(user, { roles: [...user.roles, role] })

    return await this.userRepo.createQueryBuilder()
      .where({ username })
      .update(updatedUser)
      .execute()
  }

  async removeRoleFromUser(username: string, roleName: string): Promise<User> {
    const role = await this.roleRepo.getRoleByName(roleName)
    const user = await this.userRepo.findOneOrFail({ username })
    const roles = user.roles.toArray()

    return await this.userRepo.createQueryBuilder()
      .where({ username })
      .update({ roles: roles.filter(data => data.name !== role.name) })
      .execute()
  }
}
