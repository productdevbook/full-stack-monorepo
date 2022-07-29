import { Field, ID, InputType } from '@nestjs/graphql'
import { ActionEnum } from '../../interfaces/action.enum'

@InputType()
export class CreatePermissionInput {
  @Field(() => ActionEnum)
    action!: ActionEnum

  @Field(() => ID)
    subjectId!: string
}

