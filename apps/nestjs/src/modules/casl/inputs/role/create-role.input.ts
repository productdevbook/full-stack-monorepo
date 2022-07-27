import { Field, InputType } from '@nestjs/graphql'

@InputType('RoleInput')
export class CreateRoleInput {
  @Field()
    name!: string

  @Field()
    description!: string
}
