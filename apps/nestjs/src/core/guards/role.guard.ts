import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common'

import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'
import { Roles } from '../config/roles.config'
import { hasPermission } from '../utils/roles-permission.util'

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger('ROLES GUARD')
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRole = this.reflector.get<Roles>('role', context.getHandler())

    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    const { user } = req
    const userRole = user.roles ?? null
    if (!requireRole)
      return true

    const hasAuthority = () => hasPermission(requireRole, userRole)
    if (hasAuthority())
      return true

    this.logger.error({
      userRole: userRole?.name,
      requireRole,
    })
    throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN)
  }
}
