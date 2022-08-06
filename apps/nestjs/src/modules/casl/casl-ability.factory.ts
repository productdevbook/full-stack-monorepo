import { Injectable } from '@nestjs/common'
import { Ability } from '@casl/ability'
import { AppAbilityType } from '@/modules/casl/interfaces/app-ability.type'
import { PermissionInterface } from '@/modules/casl/interfaces/permission.interface'
import { ActionEnum } from '@/modules/casl/interfaces/action.enum'
import { PermissionObjectType } from '@/modules/casl/interfaces/permission-object.type'

@Injectable()
export class CaslAbilityFactory {
  /**
 * It takes an array of permissions and returns an ability object
 * @param {Permission[] | undefined} permissions - Permission[] | undefined
 * @returns An ability object
 */
  async createForUser(permissions: any[] | undefined): Promise<AppAbilityType> {
    if (!permissions)
      throw new Error(permissions)

    const caslPermissions: PermissionInterface[] = permissions.map(p => (
      {
        action: p.action,
        subject: p.subject,
      }))
    return new Ability<[ActionEnum, PermissionObjectType]>(caslPermissions)
  }
}
