import { Injectable } from '@nestjs/common'
import { JwtArgs } from '../auth/types/jwt.args'
import { CreateNotificationTokenInput, SendNotificationInput } from './inputs/notification.inputs'
import { NotificationTokenRepository } from './repositories/notification-token.repo'
import { UserRepository } from './repositories/user.repo'
import { NotificationService } from '@/shared/services/notification.service'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly notiToken: NotificationTokenRepository,
    private readonly notiService: NotificationService,
  ) {}

  async me(id: string) {
    return this.userRepo.findOne(id)
  }

  async createToken(data: CreateNotificationTokenInput, user: JwtArgs) {
    return this.notiToken.saveToken(data, user)
  }

  async sendToken(data: SendNotificationInput) {
    return await this.notiService.sendToDevice('test', { body: data.body, title: data.title, imageUrl: 'https://pngimg.com/uploads/free/free_PNG90754.png' }, data.token)
    // return this.notiToken.saveToken(data, user)
  }
}
