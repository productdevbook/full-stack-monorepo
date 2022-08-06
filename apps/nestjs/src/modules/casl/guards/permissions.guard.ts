import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AppAbilityType } from '@/modules/casl/interfaces/app-ability.type'
import { PERMISSION_CHECKER_KEY, RequiredPermission } from '@/modules/casl/decorators/check-permissions.decorator'
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory'
import { RequiredPermissionType } from '@/modules/casl/interfaces/required-permission.type'
import { Permission, Role } from '@/entities'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  /**
   * It gets the required permissions from the decorator, creates an ability object for the user, and
   * then checks if the user has the required permissions
   * @param {ExecutionContext} context - ExecutionContext - This is the context of the request.
   * @returns A boolean value.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions: RequiredPermissionType[]
      = this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || []

    const roles = GqlExecutionContext.create(context).getContext().req.user.roles

    const permissions: Permission[] = []

    roles.forEach((r: any) => {
      permissions.push(r.permission)
    })

    const ability = await this.abilityFactory.createForUser(
      permissions,
    )
    console.log(GqlExecutionContext.create(context).getContext().req.user)
    console.log(roles)

    return requiredPermissions.every(permission =>
      PermissionsGuard.isAllowed(ability, permission),
    )
  }

  /**
   * It returns true if the ability can do the permission
   * @param {AppAbilityType} ability - AppAbilityType - This is the ability object that we created in
   * the previous step.
   * @param {RequiredPermissionType} permission - This is the permission that you want to check.
   * @returns A boolean value
   */
  private static isAllowed(
    ability: AppAbilityType,
    permission: RequiredPermissionType,
  ): boolean {
    return ability.can(...permission)
  }
}
