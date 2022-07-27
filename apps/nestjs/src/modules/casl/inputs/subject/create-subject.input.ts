import { Field, InputType } from '@nestjs/graphql'

@InputType('SubjectInput')
export class CreateSubjectInput {
  @Field()
    name!: string
}
