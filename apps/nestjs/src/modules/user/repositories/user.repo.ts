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

  public async findOne(id: string) {
    const user = await this.userRepo.findOneOrFail({ id }, { populate: ['roles'] })
    return user
  }
}
