import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { ActionEnum } from '../../interfaces/action.enum'

@InputType()
export class CreatePermissionInput {
  @Field(() => ActionEnum)
    action!: ActionEnum
}

registerEnumType(ActionEnum, {
  name: 'ActionEnum',
})
