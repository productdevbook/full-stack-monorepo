import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { ActionEnum } from '../../interfaces/action.enum'
import { Role, Subject } from '@/entities'

@InputType('PermissionInput')
export class CreatePermissionInput {
  @Field(() => Subject)
    subject!: Subject

  @Field(() => Role)
    role!: Role

  @Field(() => ActionEnum)
    action!: ActionEnum
}

registerEnumType(ActionEnum, {
  name: 'ActionEnum',
})
