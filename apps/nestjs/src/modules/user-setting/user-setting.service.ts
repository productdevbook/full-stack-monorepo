import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { User } from '../../entities/user.entity'
import { UpdateUserSettingInput } from './dto/update-user-setting.input'
import { UserSettingRepository } from './user-setting.repository'

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSettingRepository)
    private userSettingRepository: UserSettingRepository,
    private readonly i18n: I18nService,
  ) {
    this.userSettingRepository.i18n = this.i18n
  }

  async readAll(user: User) {
    return await this.userSettingRepository.readAll(user)
  }

  async updateUserSettings(user: User, data: UpdateUserSettingInput) {
    return await this.userSettingRepository.updateUserSettings(user, data)
  }
}
