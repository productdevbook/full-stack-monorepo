import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../../entities/user.entity'
import { JwtArgs } from '../auth/types/jwt.args'
import { UserService } from './user.service'
import { CreateNotificationTokenInput, SendNotificationInput } from './inputs/notification.inputs'
import { UserDecorator } from '@/core/decorators/user.decorator'
import { NotificationToken } from '@/entities'
import { Public } from '@/core/decorators/public.decorator'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { name: 'me', nullable: false })
  me(@UserDecorator() user: JwtArgs) {
    return this.userService.me(user.id)
  }

  @Mutation(() => NotificationToken)
  saveNotificationToken(@UserDecorator() user: JwtArgs, @Args('data') data: CreateNotificationTokenInput) {
    return this.userService.createToken(data, user)
  }

  @Public()
  @Mutation(() => Boolean)
  sendNotificationToken(@UserDecorator() user: JwtArgs, @Args('data') data: SendNotificationInput) {
    return this.userService.sendToken(data)
  }
}
