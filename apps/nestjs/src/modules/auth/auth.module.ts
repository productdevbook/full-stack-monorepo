import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { User } from 'src/entities'
import { CacheModule } from 'src/core/redis/cache.module'
import { AuthService } from './auth.service'

import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './strategy/jwt.strategy'
import { AuthRepository } from './repositories/auth.repo'
import { UserDeviceRepository } from './repositories/user-device.repo'
import { UserDeviceEntity } from '@/entities/user-device.entity'
import { SharedModule } from '@/shared/shared.module'
import { UserSetting } from '@/entities/user-setting.entity'

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [User, UserDeviceEntity, UserSetting] }),
    PassportModule,
    HttpModule,
    CacheModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        privateKey: configService
          .get<string>('JWT_PRIVATE_KEY')!
          .replace(/\\n/g, '\n'),
        publicKey: configService
          .get<string>('JWT_PUBLIC_KEY')!
          .replace(/\\n/g, '\n'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ConfigService],
    }),
    SharedModule,
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, AuthRepository, UserDeviceRepository],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
