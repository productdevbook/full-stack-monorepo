import { Field, InputType } from '@nestjs/graphql'

@InputType('UserInput')
export class CreateUserInput {
  @Field()
    name!: string
}
