import { DEFAULT_REDIS_NAMESPACE, RedisModule } from '@liaoliaots/nestjs-redis'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { Logger, Module } from '@nestjs/common'
import { CacheService } from './cache.service'

const logger = new Logger('redis')

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        config: {
          url: configService.get('REDIS_URL') || process.env.REDIS_URL,
          namespace: DEFAULT_REDIS_NAMESPACE,
          // db: parseInt(process.env.REDIS_DB) || rsConfig.db,
          // keyPrefix: process.env.REDIS_PRIFIX || rsConfig.prefix,
          reconnectOnError: (err) => {
            logger.error(`Redis Connection error: ${err}`)
            return true
          },
        },
      }),
    }),
  ],
  providers: [CacheService],
  exports: [RedisModule, CacheService],
})
export class CacheModule {}
