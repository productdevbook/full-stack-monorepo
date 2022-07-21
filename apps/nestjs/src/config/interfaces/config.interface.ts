import { S3ClientConfig } from '@aws-sdk/client-s3'
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs'
import { UploadOptions } from 'graphql-upload'
import { RedisOptions } from 'ioredis'
import { IBucketData } from './bucket-data.inteface'
import { IEmailConfig } from './email-config.interface'
import { IJwt } from './jwt.interface'

export interface IConfig {
  fallbackLanguage: string
  port: number
  playground: boolean
  url: string
  db: MikroOrmModuleOptions
  jwt: IJwt
  emailService: IEmailConfig
  bucketConfig: S3ClientConfig
  bucketData: IBucketData
  redis?: RedisOptions
  ttl: number
  upload: UploadOptions
  testing: boolean
  sessionTime: number
  fcm_json: string
}
