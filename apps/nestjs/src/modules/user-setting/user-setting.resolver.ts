import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserDecorator } from '../../core/decorators/user.decorator'

import { User } from '../../entities/user.entity'
import { UserSetting } from '../../entities/user-setting.entity'
import { UserSettingService } from './user-setting.service'
import { UpdateUserSettingInput } from './dto/update-user-setting.input'

@Resolver(() => UserSetting)
export class UserSettingResolver {
  constructor(private userSettingService: UserSettingService) {}

  @Query(() => UserSetting)
  async readUserSettings(@UserDecorator() user: User) {
    return this.userSettingService.readAll(user)
  }

  @Mutation(() => UserSetting)
  async updateUserSetting(
  @UserDecorator() user: User,
    @Args('data') data: UpdateUserSettingInput,
  ) {
    return this.userSettingService.updateUserSettings(user, data)
  }
}
