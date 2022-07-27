import { Field, InputType } from '@nestjs/graphql'
import { User } from '@/entities'

@InputType('RoleInput')
export class CreateRoleInput {
  @Field(() => User)
    user!: User

  @Field()
    name!: string

  @Field()
    description!: string
}
