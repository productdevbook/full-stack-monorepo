import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AppAbilityType } from '@/modules/casl/interfaces/app-ability.type'
import { PERMISSION_CHECKER_KEY, RequiredPermission } from '@/modules/casl/decorators/check-permissions.decorator'
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory'
import { RequiredPermissionType } from '@/modules/casl/interfaces/required-permission.type'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions: RequiredPermissionType[]
      = this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || []

    const { user } = context.switchToHttp().getRequest().req

    const ability = await this.abilityFactory.createForUser(
      user.permissions,
    )

    return requiredPermissions.every(permission =>
      PermissionsGuard.isAllowed(ability, permission),
    )
  }

  private static isAllowed(
    ability: AppAbilityType,
    permission: RequiredPermissionType,
  ): boolean {
    return ability.can(...permission)
  }
}
