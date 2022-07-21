import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateAuthInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
    exampleField!: number
}
