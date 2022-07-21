import {
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { CreateNotificationTokenInput } from '../inputs/notification.inputs'
import { NotificationToken } from '@/entities'
import { JwtArgs } from '@/modules/auth/types/jwt.args'

@Injectable()
export class NotificationTokenRepository {
  constructor(
    @InjectRepository(NotificationToken)
    private readonly notiTokenRepo: EntityRepository<NotificationToken>,
  ) {
  }

  // public async findOne(username: string) {
  //   const user = await this.notiTokenRepo.findOne({
  //     id: username,
  //   })
  //   return user
  // }
  public async saveToken(data: CreateNotificationTokenInput, user: JwtArgs) {
    const notiToken = this.notiTokenRepo.create({ createdBy: user.username, token: data.token, deviceId: data.deviceId })
    return await this.notiTokenRepo.persistAndFlush(notiToken)
  }
}
