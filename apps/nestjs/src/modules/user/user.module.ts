import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserRepository } from './repositories/user.repo'
import { NotificationTokenRepository } from './repositories/notification-token.repo'
import { SharedModule } from '@/shared/shared.module'
import { NotificationToken, User } from '@/entities'
import { NotificationService } from '@/shared/services/notification.service'

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [User, NotificationToken] }),
    SharedModule,
  ],
  providers: [UserResolver, UserService, UserRepository, NotificationTokenRepository, NotificationService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
