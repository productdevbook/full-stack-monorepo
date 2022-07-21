import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

export const passwordMatchRegexp
  = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

@InputType()
export class ForgotPasswordInput {
  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String)
  readonly email!: string
}

@InputType()
export class ResetPasswordInput {
  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String)
  readonly code!: string

  @IsString()
  @Matches(passwordMatchRegexp, {
    message: i18nValidationMessage('ierror.password_match_regexp'),
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String)
  readonly password!: string

  @IsString()
  @Matches(passwordMatchRegexp, {
    message: i18nValidationMessage('ierror.password_match_regexp'),
  })
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String)
  readonly repeatPassword!: string
}

