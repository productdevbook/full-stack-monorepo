import { Inject, Injectable } from '@nestjs/common'
import { RedisService } from '@liaoliaots/nestjs-redis'
import ms, { StringValue } from 'ms'
import { ConfigService } from '@nestjs/config'
import { Session } from '@/modules/auth/types/auth.types'
import { IConfig } from '@/config/interfaces/config.interface'

type jwtType = 'access' | 'refresh'

export const REDIS_VALIDJWT_KEY = (userId: string, jti: string, type: jwtType) =>
  `valid_tokens:${userId}:${jti}:${type}`
export const REDIS_VALIDJWT_INDEX_KEY = (userId: string) =>
  `valid_tokens:${userId}:index`
export const REDIS_BANJWT_KEY = (jti: string) =>
  `banned_tokens:${jti}`

@Injectable()
export class CacheService {
  private redisIsConnected = false
  public client

  public constructor(
    @Inject(RedisService) private readonly redisService: RedisService,
    private readonly configService: ConfigService<IConfig>,
  ) {
    this.client = this.redisService.getClient()

    this.client.on('connect', () => {
      this.redisIsConnected = true
    })

    this.client.on('reconnecting', () => {
      this.redisIsConnected = false
    })

    this.client.on('error', () => {
      this.redisIsConnected = false
    })
  }

  public async set(key: string, value: string | number, { ttl }: { ttl: StringValue }) {
    const time = ms(ttl, { long: false })
    const timeSecond = (time / 1000)

    if (!this.redisIsConnected)
      return null

    await this.client.set(key, value, 'EX', timeSecond)
  }

  public async get(key: string) {
    if (!this.redisIsConnected)
      return null

    const data: string | null = await this.client.get(key)

    if (!data)
      return null

    return data
  }

  public async getMulti(userId: string, jti: string, type: jwtType) {
    if (!this.redisIsConnected)
      return null

    const data = await this.client.get(REDIS_VALIDJWT_KEY(userId, jti, type))

    if (!data)
      return null

    return data
  }

  public async del(key: string): Promise<unknown> {
    if (!this.redisIsConnected)
      return null

    return await this.client.del(key)
  }

  public async delMultiple(keys: Array<string>): Promise<unknown> {
    if (!this.redisIsConnected)
      return null

    await Promise.all(
      keys.map(async (key: string) => await this.client.del(key)),
    )
    return 1
  }

  public async jwtSave(userId: string, jti: string, data: any, expiresIn: StringValue, type: jwtType): Promise<unknown> {
    const ttl = ms(expiresIn, { long: false })
    const ttlSecond = (ttl / 1000)
    const ttlDate = new Date()
    ttlDate.setSeconds(
      ttlDate.getSeconds() + ttlSecond,
    )

    this.client
      .multi()
      .setex(REDIS_VALIDJWT_KEY(userId, jti, type), ttlSecond, JSON.stringify(data))
      .zadd(
        REDIS_VALIDJWT_INDEX_KEY(userId),
        ttlDate.getTime(),
        REDIS_VALIDJWT_KEY(userId, jti, type),
      )
      .exec()
    return 1
  }

  public async _cleanOutdatedTokens(userId: string) {
    if ((await this.client.exists(REDIS_VALIDJWT_INDEX_KEY(userId))) === 1) {
      await this.client.zremrangebyscore(
        REDIS_VALIDJWT_INDEX_KEY(userId),
        0,
        Date.now(),
      )
    }
  }

  async getAllValidJwtTokensForUser(userId: string): Promise<Session[]> {
    await this._cleanOutdatedTokens(userId)
    const keys = await this.client.zrangebyscore(
      REDIS_VALIDJWT_INDEX_KEY(userId),
      '-inf',
      '+inf',
    )
    const sessions: Session[] = []
    for (const rawValue of await this.client.mget(keys)) {
      if (rawValue)
        sessions.push(JSON.parse(rawValue))
    }
    return sessions
  }

  async disableJWTToken(userId: string, jwtJTI: string) {
    const time = this.configService.get('jwt.expirationTime', { infer: true })!
    const ttl = ms(time, { long: false })
    const ttlSecond = (ttl / 1000)
    return await this.client
      .multi()
      .zrem(
        REDIS_VALIDJWT_INDEX_KEY(userId),
        [
          REDIS_VALIDJWT_KEY(userId, jwtJTI, 'access'),
          REDIS_VALIDJWT_KEY(userId, jwtJTI, 'refresh'),
        ],
      )
      .del(
        [
          REDIS_VALIDJWT_KEY(userId, jwtJTI, 'access'),
          REDIS_VALIDJWT_KEY(userId, jwtJTI, 'refresh'),
        ],
      )
      .setex(REDIS_BANJWT_KEY(jwtJTI), ttlSecond, 'true')
      .exec()
  }
}
