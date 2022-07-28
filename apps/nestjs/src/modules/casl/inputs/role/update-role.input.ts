import { InputType, PartialType } from '@nestjs/graphql'
import { CreateAdminRoleInput } from './create-role.input'

@InputType()
export class UpdateRoleInput extends PartialType(CreateAdminRoleInput) {}
