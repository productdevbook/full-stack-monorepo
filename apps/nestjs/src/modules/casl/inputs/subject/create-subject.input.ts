import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSubjectInput {
  @Field()
    name!: string
}
