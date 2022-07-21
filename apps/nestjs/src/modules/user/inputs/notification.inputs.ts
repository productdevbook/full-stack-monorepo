import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { i18nValidationMessage } from 'nestjs-i18n'

@InputType()
export class CreateNotificationTokenInput {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String, { description: 'Example field (placeholder)' })
    token!: string

  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String, { description: 'Example field (placeholder)' })
    deviceId!: string
}

@InputType()
export class SendNotificationInput {
  @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @Field(() => String, { description: 'Example field (placeholder)' })
    token!: string

  @Field(() => String, { description: 'Example field (placeholder)' })
    title!: string

  @Field(() => String, { description: 'Example field (placeholder)' })
    body!: string
}
