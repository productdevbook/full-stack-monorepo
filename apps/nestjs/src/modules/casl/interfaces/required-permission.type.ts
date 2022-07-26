import { ActionEnum } from '@/modules/casl/interfaces/action.enum'
import { PermissionObjectType } from '@/modules/casl/interfaces/permission-object.type'

export type RequiredPermissionType = [
  ActionEnum,
  PermissionObjectType,
]
