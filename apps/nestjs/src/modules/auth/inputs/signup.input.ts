import { Field, HideField, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    username!: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    name!: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    email!: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    password!: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    confirmPassword!: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    displayName!: string

  @IsNotEmpty()
  @IsBoolean()
  @Field(() => Boolean)
    isTermsAccepted!: boolean

  @HideField()
    passwordSalt!: string
}
