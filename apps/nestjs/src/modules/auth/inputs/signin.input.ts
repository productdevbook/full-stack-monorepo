import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

@InputType()
export class SignInInput {
  @IsString()
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String)
  readonly email!: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly password!: string

  @IsBoolean()
  @Field(() => Boolean, { defaultValue: false })
  readonly rememberMe!: boolean

  @IsBoolean()
  @Field(() => Boolean, { defaultValue: false })
  readonly isCookies!: boolean
}
