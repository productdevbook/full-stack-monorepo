import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { ActionEnum } from '@/modules/casl/interfaces/action.enum'
import { PermissionObjectType } from '@/modules/casl/interfaces/permission-object.type'

export type RequiredPermission = [ActionEnum, PermissionObjectType]
export const PERMISSION_CHECKER_KEY = 'permission_checker_params_key'

/**
 * It takes a list of permissions and returns a decorator that sets the PERMISSION_CHECKER_KEY metadata
 * on the decorated class or method
 * @param {RequiredPermission[]} params - RequiredPermission[] - This is an array of RequiredPermission
 * objects.
 */
export const CheckPermissions = (...params: RequiredPermission[]): CustomDecorator<string> =>
  SetMetadata(PERMISSION_CHECKER_KEY, params)
