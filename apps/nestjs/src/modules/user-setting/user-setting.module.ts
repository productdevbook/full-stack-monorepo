import { Module } from '@nestjs/common'

import { MikroOrmModule } from '@mikro-orm/nestjs'
import { UserSettingResolver } from './user-setting.resolver'
import { UserSettingService } from './user-setting.service'
import { UserSetting } from '@/entities/user-setting.entity'

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [UserSetting],
    }),
  ],
  providers: [UserSettingService, UserSettingResolver],
  exports: [UserSettingService],
})
export class UserSettingModule {}
