import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

// import { getI18nContextFromRequest } from 'nestjs-i18n'
import { AuthService } from './auth.service'
import { SignInInput } from './inputs/signin.input'
import { SignUpInput } from './inputs/signup.input'
import { JwtArgs } from './types/jwt.args'
import { TokenResponse } from './types/token.object'
import { Session } from './types/auth.types'
import { TerminateSessionInput } from './inputs/terminate-session.input'
import { RefreshTokenInput } from './inputs/refreshToken.input'
import { ForgotPasswordInput, ResetPasswordInput } from './inputs/passwordReset.input'
import { User } from '@/entities'
import { UserDecorator } from '@/core/decorators/user.decorator'

import { Public } from '@/core/decorators/public.decorator'
import { ICtx } from '@/core/interfaces/ctx.interface'
import { MailService } from '@/services/mail.service'

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailService,
  ) {}

  @Public()
  @Mutation(() => User)
  async signUp(@Args('data') data: SignUpInput, @Context() context: ICtx) {
    const user = await this.authService.signUp(data, context)
    return user
  }

  @Public()
  @Mutation(() => TokenResponse)
  async signIn(@Args('data') data: SignInInput, @Context() context: ICtx): Promise<TokenResponse> {
    const user = await this.authService.signIn(data, context.req)
    if (data.isCookies)
      this.authService.sendJwtCookie(context.res, user.accessToken, user.refreshToken)
    return user
  }

  @Mutation(() => Boolean)
  async logout(@UserDecorator() user: JwtArgs, @Context() context: ICtx): Promise<Boolean> {
    if (!user)
      throw new Error('User not found')
    this.authService.deleteJwtCookie(context.res)
    return await this.authService.logout(user)
  }

  @Query(() => [Session])
  async sessions(@UserDecorator() user: JwtArgs): Promise<Session[]> {
    if (!user)
      throw new Error('User not found')
    return await this.authService.getAllValidJwtTokensForUser(user.id)
  }

  @Public()
  @Mutation(() => TokenResponse)
  async refreshToken(@UserDecorator() user: JwtArgs, @Context() context: ICtx, @Args('data') data: RefreshTokenInput): Promise<TokenResponse> {
    const returnd = await this.authService.createNewToken(data, context.req)
    return returnd
  }

  @Public()
  @Mutation(() => Boolean)
  async forgotPassword(@Context() context: ICtx, @Args('data') data: ForgotPasswordInput) {
    await this.authService.forgotPassword(data, context.req)
    return true
  }

  @Public()
  @Mutation(() => Boolean)
  async resetPassword(@Context() context: ICtx, @Args('data') data: ResetPasswordInput) {
    return await this.authService.resetPassword(data, context.req)
  }

  @Mutation(() => Boolean)
  async terminateSession(
  @UserDecorator() user: JwtArgs,
    @Args('data') data: TerminateSessionInput,
  ) {
    await this.authService.disableJWTToken(user, data)
    return true
  }
}
