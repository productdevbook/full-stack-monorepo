import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { MikroOrmModule } from '@mikro-orm/nestjs'

import { AuthResolver } from '../auth.resolver'
import { AuthService } from '../auth.service'
import { AuthRepository } from '../repositories/auth.repo'
import { UserDeviceRepository } from '../repositories/user-device.repo'
// import { UserDecorator } from '@/core/decorators/user.decorator'
import { CacheService } from '@/core/redis/cache.service'
import { User, UserDeviceEntity } from '@/entities'
import { CacheModule } from '@/core/redis/cache.module'

describe('AuthResolver', () => {
  let resolver: AuthResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        MikroOrmModule.forFeature({ entities: [User, UserDeviceEntity] }),
        CacheModule,
      ],
      providers: [
        AuthResolver,
        AuthService,
        ConfigService,
        AuthRepository,
        UserDeviceRepository,
        JwtService,
        CacheService,
      ],
    }).compile()

    resolver = module.get<AuthResolver>(AuthResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
