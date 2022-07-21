import * as path from 'path'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
  AcceptLanguageResolver, CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n'

import { TranslateService } from './translate.service'
import { IConfig } from '@/config/interfaces/config.interface'

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<IConfig>) => ({
        fallbackLanguage: configService.get('fallbackLanguage') ?? 'en',
        fallbacks: {
          'en-EN': 'en',
          'tr-tr': 'tr',
        },
        loaderOptions: {
          path: path.join(__dirname, '../../../i18n/'),
          watch: true,
        },
      }),
      inject: [ConfigService],
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
        new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
  ],
  providers: [TranslateService],
  exports: [TranslateService],
})
export class TranslateModule {}
