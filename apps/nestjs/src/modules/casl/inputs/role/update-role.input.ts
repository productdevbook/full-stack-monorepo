import { InputType, PartialType } from '@nestjs/graphql'
import { CreateAdminRoleInput } from './create-role.input'

@InputType('UpdateRoleInput')
export class UpdateRoleInput extends PartialType(CreateAdminRoleInput) {}
