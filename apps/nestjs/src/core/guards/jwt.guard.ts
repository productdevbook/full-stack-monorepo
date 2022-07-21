import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request, Response } from 'express'

import { Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
// import { getI18nContextFromRequest } from 'nestjs-i18n'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { AuthService } from '@/modules/auth/auth.service'

@Injectable()
export class JWTGuard extends AuthGuard('jwt-access') {
  public constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {
    super()
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublicRoute: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    )
    const gqlCtx = GqlExecutionContext.create(context)
    const ctx = gqlCtx.getContext().req as Request
    // Language: typescript
    // const i18n = getI18nContextFromRequest(ctx)
    // console.log('current language', i18n.lang)

    if (isPublicRoute)
      return true

    const header = ctx.headers.authorization
    const _accesToken = ctx.cookies[this.configService.get<string>('JWT_COOKIE_NAME') || 'accessToken']

    if (!header && _accesToken)
      ctx.headers.authorization = `Bearer ${_accesToken}`

    return (await super.canActivate(context)) as boolean
  }

  handleRequest(err: any, user: any) {
    if (err || !user)
      throw err || new UnauthorizedException()

    return user
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    return req
  }

  getResponse(context: ExecutionContext): Response {
    const ctx = GqlExecutionContext.create(context)
    const { res } = ctx.getContext()
    return res
  }
}
