import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { ActionEnum } from '@/modules/casl/interfaces/action.enum'
import { PermissionObjectType } from '@/modules/casl/interfaces/permission-object.type'

export type RequiredPermission = [ActionEnum, PermissionObjectType]
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key'
export const CheckPermissions = (...params: RequiredPermission[]): CustomDecorator<string> =>
  SetMetadata(PERMISSION_CHECKER_KEY, params)
