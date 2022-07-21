import crypto from 'crypto'

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { v1, v5 } from 'uuid'

import { Request, Response } from 'express'
import UAParser from 'ua-parser-js'
import ms from 'ms'
import { nanoid } from 'nanoid'
import { getI18nContextFromRequest } from 'nestjs-i18n'
import { TranslateService } from '../translate/translate.service'
import { AuthRepository } from './repositories/auth.repo'
import { SignUpInput } from './inputs/signup.input'
import { SignInInput } from './inputs/signin.input'
import { TokenResponse } from './types/token.object'
import { JwtArgs } from './types/jwt.args'
import { UserDeviceRepository } from './repositories/user-device.repo'
import { Session } from './types/auth.types'
import { TerminateSessionInput } from './inputs/terminate-session.input'
import { RefreshTokenInput } from './inputs/refreshToken.input'
import { ForgotPasswordInput, ResetPasswordInput } from './inputs/passwordReset.input'
import { CacheService } from '@/core/redis/cache.service'
import { createDeviceHash } from '@/core/utils/create-device-hash'
import { IConfig } from '@/config/interfaces/config.interface'
import { User } from '@/entities'
import { MailService } from '@/services/mail.service'
import { ICtx } from '@/core/interfaces/ctx.interface'
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<IConfig>,
    private readonly authRepository: AuthRepository,
    private readonly userDeviceRepo: UserDeviceRepository,
    private readonly jwtService: JwtService,
    private readonly cacheService: CacheService,
    private readonly i18n: TranslateService,
    private mailService: MailService,
  ) {

  }

  public async signUp(data: SignUpInput, context: ICtx): Promise<User> {
    if (data.password !== data.confirmPassword)
      throw new HttpException(await this.i18n.error('ierror.passwords_dont_match'), HttpStatus.UNAUTHORIZED)

    const passwordSalt = this.createPasswordSalt()
    const hashedPassword = this.createHashedPassword(data.password, passwordSalt)
    data.password = hashedPassword
    data.passwordSalt = passwordSalt
    const user = await this.authRepository.signUp(data)
    try {
      await this.mailService.sendMail({
        template: {
          type: 'welcome',
          context: {
            lang: getI18nContextFromRequest(context.req).lang,
            action_url: this.configService.get('url')!,
            login_url: `${this.configService.get('url')!}/auth/login`,
            username: user.username,
            help_url: this.configService.get('url')!,
            welcomeArgs: { username: user.username, support_email: 'support@appname.com', live_chat_url: 'https://appname.com' },
          },
        },
        subject: 'Welcome to the app',
        to: user.email,
      })
    }
    catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
    return user
  }

  public async signIn(data: SignInInput, req: Request): Promise<TokenResponse> {
    const user = await this.authRepository.singin(data)
    this.cacheService._cleanOutdatedTokens(user.id)

    const hashedPassword = this.createHashedPassword(data.password, user.passwordSalt)
    if (user.password !== hashedPassword)

      throw new UnauthorizedException()
    const userLoginAt = new Date()
    const userDeviceHash
        = createDeviceHash(req, { user_id: user.id })

    const userAgent = UAParser(req.header('user-agent'))

    await this.userDeviceRepo.save(
      user,
      userDeviceHash,
      req,
      userLoginAt,
      userAgent,
    )

    user.lastLoginIp = req.clientIp
    user.lastLoginAt = userLoginAt
    await this.authRepository.save(user)

    const { accessToken, refreshToken } = await this.sessionData(req, userLoginAt, user.id, user.username, userDeviceHash)

    return {
      accessToken,
      refreshToken,
    }
  }

  async logout(user: JwtArgs): Promise<Boolean> {
    if (!user.id)
      throw new UnauthorizedException() // revoke the jwt on logout
    await this.cacheService.disableJWTToken(user.id, user.jti)
    return true
  }

  async forgotPassword(data: ForgotPasswordInput, req: Request) {
    const user = await this.authRepository.findUser(data.email)
    if (!user)
      throw new HttpException(await this.i18n.error('ierror.user_dont_found'), HttpStatus.UNAUTHORIZED)
    const userAgent = UAParser(req.header('user-agent'))
    const id = nanoid(21)
    await this.cacheService.set(id, data.email, { ttl: '1h' })
    try {
      await this.mailService.sendMail({
        template: {
          type: 'password-reset',
          context: {
            lang: getI18nContextFromRequest(req).lang,
            action_url: `${this.configService.get('url')!}/auth/new-password?code=${id}`,
            username: user.username,
            help_url: this.configService.get('url')!,
            dArgs: {
              browser_name: userAgent.browser.name || '',
              help_url: this.configService.get('url')!,
              operating_system: userAgent.os.name || '',
              username: user.username,
              time: '1',
            },
          },
        },
        subject: await this.i18n.mail('email.password_reset.title'),
        to: user.email,
      })
    }
    catch (error) {
      throw new HttpException(await this.i18n.mail('email.password_reset.error'), HttpStatus.UNAUTHORIZED)
    }

    return true
  }

  async resetPassword(data: ResetPasswordInput, req: Request) {
    try {
      const res = await this.cacheService.get(data.code)
      if (res) {
        const user = await this.authRepository.findUser(res)
        if (!user)
          throw new HttpException(await this.i18n.error('ierror.user_dont_found'), HttpStatus.NOT_FOUND)
        const passwordSalt = this.createPasswordSalt()
        const hashedPassword = this.createHashedPassword(data.password, passwordSalt)
        user.password = hashedPassword
        user.passwordSalt = passwordSalt
        try {
          await this.cacheService.del(data.code)
        }
        catch (error) {
          throw new HttpException(await this.i18n.error('ierror.could_not_reset_password'), HttpStatus.METHOD_NOT_ALLOWED)
        }
        const userAgent = UAParser(req.header('user-agent'))
        const id = nanoid(21)
        await this.cacheService.set(id, user.email, { ttl: '1h' })
        await this.mailService.sendMail({
          template: {
            type: 'password-reset-confirm',
            context: {
              lang: getI18nContextFromRequest(req).lang,
              action_url: `${this.configService.get('url')!}/auth/new-password?code=${id}`,
              help_url: this.configService.get('url')!,
              dArgs: {
                browser_name: userAgent.browser.name || '',
                help_url: this.configService.get('url')!,
                operating_system: userAgent.os.name || '',
                time: '1',
              },
            },
          },
          subject: await this.i18n.mail('email.password_reset.title'),
          to: user.email,
        })
        await this.authRepository.save(user)
        return true
      }
      else {
        throw new HttpException(await this.i18n.error('ierror.code_expired'), HttpStatus.METHOD_NOT_ALLOWED)
      }
    }
    catch (error) {
      throw new HttpException(await this.i18n.error('ierror.could_not_reset_password'), HttpStatus.METHOD_NOT_ALLOWED)
    }
  }

  async disableJWTToken(user: JwtArgs, data: TerminateSessionInput) {
    await this.cacheService.disableJWTToken(user.id, data.jti)
  }

  async getAllValidJwtTokensForUser(userId: string) {
    return await this.cacheService.getAllValidJwtTokensForUser(userId)
  }

  public async createNewToken(data: RefreshTokenInput, req: Request): Promise<TokenResponse> {
    if (data.refreshToken.length < 20)
      throw new UnauthorizedException()

    const jwt = this.jwtService.verify(data.refreshToken, {
      algorithms: ['RS256'],
      secret: this.configService
        .get('jwt.public', { infer: true })!
        .replace(/\\n/g, '\n'),
      ignoreExpiration: false,
    }) as JwtArgs
    if (jwt.token_type === 'refresh') {
      const refreshToken = await this.cacheService.getMulti(jwt.id, jwt.jti, 'refresh')
      if (!refreshToken)
        throw new UnauthorizedException()
    }

    this.jwtService.verifyAsync(data.refreshToken, {
      algorithms: ['RS256'],
      secret: this.configService
        .get('jwt.private', { infer: true })!
        .replace(/\\n/g, '\n'),
    }).catch(async () => {
      await this.cacheService.disableJWTToken(jwt.id, jwt.jti)
      throw new UnauthorizedException()
    })

    const userLoginAt = new Date()
    const userDeviceHash
    = createDeviceHash(req, { user_id: jwt.id })

    const oldToken = await this.cacheService.getMulti(jwt.id, jwt.jti, 'refresh')
    if (!oldToken)
      throw new UnauthorizedException(await this.i18n.error('ierror.invalid_refresh_token'))

    const parse = JSON.parse(oldToken) as Session
    if (userDeviceHash !== parse.hashedJWT)
      throw new UnauthorizedException(await this.i18n.error('ierror.you_cant_login_to_your_account'))

    const { accessToken, refreshToken } = await this.sessionData(req, userLoginAt, jwt.id, jwt.username, userDeviceHash)

    return {
      accessToken,
      refreshToken,
    }
  }

  private createPasswordSalt() {
    return crypto.randomBytes(64).toString('base64')
  }

  private createHashedPassword(password: string, salt: string) {
    return crypto.pbkdf2Sync(password, salt, 9999, 64, 'sha512').toString('base64')
  }

  private async generateAccessToken(data: JwtArgs) {
    const expiresIn = this.configService.get('jwt.access.time', { infer: true })!

    const payload: JwtArgs = {
      id: data.id,
      roles: data.roles,
      permissions: data.permissions,
      aud: this.configService.get('jwt.aud', { infer: true }),
      iss: this.configService.get('jwt.iss', { infer: true }),
      token_type: 'access',
      username: data.username,
      jti: data.jti,
    }
    const accessToken = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      secret: this.configService
        .get('jwt.private', { infer: true })!
        .replace(/\\n/g, '\n'),
      expiresIn,
    })

    return { accessToken, expiresIn }
  }

  private async generateRefreshToken(data: JwtArgs) {
    await this.cacheService._cleanOutdatedTokens(data.id)
    const expiresIn = this.configService.get('jwt.refresh.time', { infer: true })!
    const payload: JwtArgs = {
      id: data.id,
      username: data.username,
      jti: data.jti,
      aud: this.configService.get('jwt.aud', { infer: true }),
      iss: this.configService.get('jwt.iss', { infer: true }),
      token_type: 'refresh',
    }

    const refreshToken = await this.jwtService.signAsync(payload, {
      algorithm: 'RS256',
      secret: this.configService
        .get('jwt.private', { infer: true })!
        .replace(/\\n/g, '\n'),
      expiresIn,
    })

    return { refreshToken, expiresIn }
  }

  protected generateJti(userId: string) {
    return v5(`${userId}`, v1())
  }

  sendJwtCookie(res: Response, accessToken: string, _refreshToken: string) {
    const expirationDate = new Date()
    const time = this.configService.get('jwt.access.time', { infer: true })!
    const ttl = ms(time, { long: true })
    const ttlSecond = (ttl / 1000)
    expirationDate.setSeconds(
      expirationDate.getSeconds()
        + ttlSecond,
    )

    res.cookie(this.configService.get('jwt.access.cookieName', { infer: true }) || 'accessToken', accessToken, {
      path: '/',
      httpOnly: true,
      expires: expirationDate,
      sameSite: 'none',
      secure: true,
    })
  }

  deleteJwtCookie(res: Response) {
    res.clearCookie(this.configService.get('jwt.access.cookieName', { infer: true }) || 'accessToken', {
      path: '/',
      httpOnly: false,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    })
    res.clearCookie(this.configService.get('jwt.refresh.cookieName', { infer: true }) || 'refreshToken', {
      path: '/',
      httpOnly: false,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    })
  }

  async sessionData(req: Request, userLoginAt: Date, userId: string, username: string, deviceHash: string): Promise<TokenResponse> {
    const userAgent = UAParser(req.header('user-agent'))

    const jti = this.generateJti(userId)

    const _accessToken = await this.generateAccessToken({
      id: userId,
      username,
      jti,
    })

    const sessionData = new Session()
    sessionData.hashedJWT = deviceHash
    sessionData.jit = jti
    sessionData.device = userAgent
    sessionData.ip = req.clientIp || req.ip
    sessionData.createdDate = userLoginAt as any
    await this.cacheService.jwtSave(userId, jti, sessionData, _accessToken.expiresIn, 'access')

    const _refreshToken = await this.generateRefreshToken({
      id: userId,
      username,
      jti,
    })

    await this.cacheService.jwtSave(userId, jti, sessionData, _refreshToken.expiresIn, 'refresh')

    return { accessToken: _accessToken.accessToken, refreshToken: _refreshToken.refreshToken }
  }
}
