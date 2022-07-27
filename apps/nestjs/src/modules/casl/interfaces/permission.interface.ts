import { ActionEnum } from '@/modules/casl/interfaces/action.enum'

export interface PermissionInterface {
  action: ActionEnum
  subject: string
}
