import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { Email, Global, Ierror, Validation } from './interfaces'
import { RecursiveKeyOf } from '@/types'

@Injectable()
export class TranslateService {
  constructor(private readonly i18nService: I18nService) {}

  global(
    key: RecursiveKeyOf<Global, 'global'>,
    message?: (string | Record<string, any>)[] | Record<string, any>,
  ): Promise<string> {
    const keyString = key.toString()
    return this.i18nService.t(keyString, { args: message })
  }

  validation(
    key: RecursiveKeyOf<Validation, 'validation'>,
    message?: (string | Record<string, any>)[] | Record<string, any>,
  ): Promise<string> {
    const keyString = key.toString()
    return this.i18nService.t(keyString, { args: message })
  }

  async error(
    key: RecursiveKeyOf<Ierror, 'ierror'>,
    message?: (string | Record<string, any>)[] | Record<string, any>,
  ): Promise<string> {
    const keyString = key.toString()
    return await this.i18nService.translate(keyString, { args: message })
  }

  async mail(
    key: RecursiveKeyOf<Email, 'email'>,
    message?: (string | Record<string, any>)[] | Record<string, any>,
  ): Promise<string> {
    const keyString = key.toString()
    return await this.i18nService.translate(keyString, { args: message })
  }
}
