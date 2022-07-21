import { LoadStrategy, UnderscoreNamingStrategy } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { Logger } from '@nestjs/common'
import { StringValue } from 'ms'
import { IConfig } from './interfaces/config.interface'
import { redisUrlToOptions } from './utils/redis-url-to-options.util'

const logger = new Logger('MikroORM')

export function config(): IConfig {
  const testing = process.env.NODE_ENV !== 'production'
  const bucketBase = `${process.env.BUCKET_REGION}.${process.env.BUCKET_HOST}.com`

  return {
    fallbackLanguage: process.env.FALLBACK_LANGUAGE ?? 'en',
    port: parseInt(process.env.PORT, 10),
    playground: process.env.PLAYGROUND === 'true',
    url: process.env.URL,
    jwt: {
      private: process.env.JWT_PRIVATE_KEY,
      public: process.env.JWT_PUBLIC_KEY,
      cookieRefresh: process.env.JWT_COOKIE_REFRESH_NAME,
      aud: process.env.JWT_AUDIENCE,
      iss: process.env.JWT_ISSUER,
      expirationTime: process.env.JWT_EXPIRATION_TIME as StringValue || '5h',
      access: {
        time: process.env.JWT_EXPIRES_IN as StringValue || '1h',
        cookieName: process.env.JWT_COOKIE_NAME,
      },
      refresh: {
        time: process.env.JWT_REFRESH_EXPIRES_IN as StringValue || '1d',
        cookieName: process.env.JWT_COOKIE_REFRESH_NAME,
      },
    },
    emailService: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: Boolean(process.env.EMAIL_DEBUG),
    },
    bucketConfig: {
      forcePathStyle: false,
      region: process.env.BUCKET_REGION,
      endpoint: `https://${bucketBase}`,
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.BUCKET_SECRET_KEY,
      },
    },
    bucketData: {
      name: process.env.BUCKET_NAME,
      url: `https://${process.env.BUCKET_NAME}.${bucketBase}`,
    },
    db: testing
      ? {
          type: 'postgresql',
          clientUrl: process.env.DATABASE_URL,
          entities: ['dist/src/entities/**/*.entity.js', 'dist/**/*.embeddable.js'],
          entitiesTs: ['src/entities/**/*.entity.ts', 'src/**/*.embeddable.ts'],
          loadStrategy: LoadStrategy.JOINED,
          metadataProvider: TsMorphMetadataProvider,
          forceUtcTimezone: true,
          flushMode: 0,
          namingStrategy: UnderscoreNamingStrategy,
          debug: true,
          highlighter: new SqlHighlighter(),
          validate: true,
          strict: true,
          migrations: {
            disableForeignKeys: false,
          },
          logger: logger.log.bind(logger),
        }
      : {
          type: 'postgresql',
          clientUrl: process.env.DATABASE_URL,
          entities: ['dist/src/entities/**/*.entity.js', 'dist/**/*.embeddable.js'],
          entitiesTs: ['src/entities/**/*.entity.ts', 'src/**/*.embeddable.ts'],
          loadStrategy: LoadStrategy.JOINED,
          allowGlobalContext: true,
        },
    redis: testing ? undefined : redisUrlToOptions(process.env.REDIS_URL),
    ttl: parseInt(process.env.REDIS_CACHE_TTL, 10),
    upload: {
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE, 10),
      maxFiles: parseInt(process.env.MAX_FILES, 10),
    },
    sessionTime: parseInt(process.env.WS_TIME, 10),
    testing,
    fcm_json: process.env.FCM_JSON || '',
  }
}
