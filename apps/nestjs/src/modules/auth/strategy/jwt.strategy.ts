import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { CacheService } from 'src/core/redis/cache.service'
import { AuthService } from '../auth.service'
import { JwtArgs } from '../types/jwt.args'

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly cacheService: CacheService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService
        .get<string>('JWT_PUBLIC_KEY')!
        .replace(/\\n/g, '\n'),
      algorithms: ['RS256'],
    } as StrategyOptions)
  }

  async validate(payload: JwtArgs) {
    if (!payload)
      throw new UnauthorizedException()

    if (payload.token_type === 'access') {
      const accessToken = await this.cacheService.getMulti(payload.id, payload.jti, 'access')
      if (!accessToken)
        throw new UnauthorizedException()
    }

    // const user = await this.authService.isApprovedUser(payload.id);
    // if (!user) {
    //   Sentry.captureMessage('Unauthorized user');
    //   throw new UnauthorizedException();
    // }

    return payload
  }
}

