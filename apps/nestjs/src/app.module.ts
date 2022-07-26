import path from 'path'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { APP_GUARD } from '@nestjs/core'

import { JwtService } from '@nestjs/jwt'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { I18nService } from 'nestjs-i18n'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
// import { AuthorityModule } from './modules/authority/authority.module'
// import { UserSettingModule } from './modules/user-setting/user-setting.module'

import { CacheModule } from './core/redis/cache.module'
import { JWTGuard } from './core/guards/jwt.guard'
import { validationSchema } from './config/validation'
import { config } from './config/config'
import { MikroOrmConfig } from './config/mikroorm.config'
import { GqlConfigService } from './config/graphql.config'
import { AuthResolver } from './app.resolver'
import { TranslateModule } from './modules/translate/translate.module'
import { IConfig } from './config/interfaces/config.interface'
import { CaslModule } from './modules/casl/casl.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MikroOrmConfig,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    UserModule,
    AuthModule,
    CacheModule,
    // AuthorityModule,
    // UserSettingModule,
    TranslateModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [I18nService, ConfigService],
      useFactory: (i18n: I18nService, configService: ConfigService<IConfig>) => {
        i18n.hbsHelper = (key: string, args: any, options: any) => {
          if (!options)
            options = args

          const lang = options.lookupProperty(options.data.root, 'lang')
          return i18n.t(key, { lang, args })
        }
        const options: MailerOptions = {

          preview: configService.get('emailService.debug', { infer: true }),
          // `smtps://${process.env.MAILER_SMTP_LOGIN}:${process.env.MAILER_SMTP_PASSWORD}@${process.env.MAILER_SMTP_DOMAIN}`
          transport: {
            host: configService.get('emailService.host', { infer: true }), // change to your email smtp server like www.example.com
            port: configService.get('emailService.port', { infer: true }), // change to configured tls port for smtp server
            secure: true,
            auth: {
              user: configService.get('emailService.auth.user', { infer: true }),
              pass: configService.get('emailService.auth.pass', { infer: true }),
            },
          },
          defaults: {
            from: '"appname-app" <help@appname.com>',
          },
          template: {
            dir: path.join(__dirname, '../../email/plain/'),
            adapter: new HandlebarsAdapter({ t: i18n.hbsHelper }),
            options: {
              strict: true,
            },
          },
        }
        return options
      },
    }),
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, AuthResolver, {
    provide: APP_GUARD,
    useClass: JWTGuard,
  }],
})
export class AppModule {}
