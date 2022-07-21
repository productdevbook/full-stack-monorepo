import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { User } from '@/entities'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: EntityRepository<User>,
  ) {
  }

  public async findOne(username: string) {
    const user = await this.userRepo.findOne({
      id: username,
    })
    return user
  }
}
