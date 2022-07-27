import { InputType, PartialType } from '@nestjs/graphql'
import { CreatePermissionInput } from './create-permission.input'

@InputType('UpdatePermissionInput')
export class UpdatePermissionInput extends PartialType(CreatePermissionInput) {}
