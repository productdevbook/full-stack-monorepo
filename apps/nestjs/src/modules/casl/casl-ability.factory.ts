import { Injectable } from '@nestjs/common'
import { Ability } from '@casl/ability'
import { AppAbilityType } from '@/modules/casl/interfaces/app-ability.type'
import { PermissionInterface } from '@/modules/casl/interfaces/permission.interface'
import { ActionEnum } from '@/modules/casl/interfaces/action.enum'
import { PermissionObjectType } from '@/modules/casl/interfaces/permission-object.type'
import { Permission } from '@/entities'

@Injectable()
export class CaslAbilityFactory {
  // permission is entity
  async createForUser(permissions: Permission[] | undefined): Promise<AppAbilityType> {
    if (!permissions)
      throw Error

    const caslPermissions: PermissionInterface[] = permissions.map(p => ({
      action: p.action,
      subject: p.subject.property.name,
    }))
    return new Ability<[ActionEnum, PermissionObjectType]>(caslPermissions)
  }
}
