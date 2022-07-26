import { ActionEnum } from '@/modules/casl/interfaces/action.enum'
import { ConditionInterface } from '@/modules/casl/interfaces/condition.interface'

export interface PermissionInterface {
  action: ActionEnum
  subject: string
  condition?: ConditionInterface
}
