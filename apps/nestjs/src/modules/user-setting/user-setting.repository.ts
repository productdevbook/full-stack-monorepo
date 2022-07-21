import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { I18nService } from 'nestjs-i18n'
import { Injectable } from '@nestjs/common'
import { User } from '../../entities/user.entity'
import { City } from '../../entities/city.entity'
import { UserSetting } from '../../entities/user-setting.entity'
import { SiteLanguage } from '../../entities/site-language.entity'
import { SiteTheme } from '../../entities/site-theme.entity'
import { Country } from '../../entities/country.entity'
import { Currency } from '../../entities/currency.entity'
import { UpdateUserSettingInput } from './dto/update-user-setting.input'

@Injectable()
export class UserSettingRepository {
  constructor(
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: EntityRepository<UserSetting>,
  ) {
  }

  i18n!: I18nService
  async readAll(user: User) {
    const setting = await this.userSettingRepository.createQueryBuilder('userSetting')
      .leftJoinAndSelect('userSetting.siteLanguage', 'siteLanguage')
      .leftJoinAndSelect('userSetting.siteTheme', 'siteTheme')
      .leftJoinAndSelect('userSetting.user', 'user')
      .leftJoinAndSelect('user.accountType', 'accountType')
      .where('userSetting.user = :user', [user.id])
      .getSingleResult()

    return setting
  }

  async updateUserSettings(user: User, data: UpdateUserSettingInput) {
    const setting = await this.userSettingRepository.createQueryBuilder('userSetting')
      .leftJoinAndSelect('userSetting.siteLanguage', 'siteLanguage')
      .leftJoinAndSelect('userSetting.siteTheme', 'siteTheme')
      .where('userSetting.user = :user', [user.id])
      .getSingleResult()

    if (data.siteLanguageId && setting) {
      const siteLang = new SiteLanguage()
      siteLang.id = data.siteLanguageId
      setting.siteLanguage = siteLang
    }
    if (data.siteThemeId && setting) {
      const siteTheme = new SiteTheme()
      siteTheme.id = data.siteThemeId
      setting.siteTheme = siteTheme
    }
    if (data.timezone && setting)
      setting.timezone = data.timezone

    if (data.countryId && setting) {
      const country = new Country()
      // country.id = data.countryId
      setting.country = country
    }
    if (data.cityId && setting) {
      const city = new City()
      city.id = data.cityId
      setting.city = city
    }
    if (data.currencyId && setting) {
      const currency = new Currency()
      currency.id = data.currencyId
      setting.currency = currency
    }
    if (setting)
      return await this.userSettingRepository.persistAndFlush(setting)

    return null
  }
}
