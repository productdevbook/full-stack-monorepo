import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class TerminateSessionInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    jti!: string
}
