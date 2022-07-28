import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AuthModule } from '../auth/auth.module'
import { PermissionRepository, RoleRepository, SubjectRepository } from './repositories'
import { RoleService } from './services/role.service'
import { PermissionService } from './services/permission.service'
import { SubjectService } from './services/subject.service'
import { SubjectResolver } from './resolvers/subject.resolver'
import { CaslUserRepository } from './repositories/user.repo'
import { CalsRoleResolver } from './resolvers/role.resolver'
import { CalsPermissionResolver } from './resolvers/permission.resolver'
import { Permission, Role, Subject, User } from '@/entities'
import { PermissionsGuard } from '@/modules/casl/guards/permissions.guard'
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory'

const repositories = [
  RoleRepository,
  PermissionRepository,
  SubjectRepository,
  CaslUserRepository,
]

const services = [
  RoleService,
  PermissionService,
  SubjectService,
]

const resolvers = [
  SubjectResolver,
  CalsRoleResolver,
  CalsPermissionResolver,
]

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Role, Permission, Subject, User] }), AuthModule],
  providers: [
    CaslAbilityFactory,
    PermissionsGuard,
    ...services,
    ...repositories,
    ...resolvers,
  ],
  exports: [CaslAbilityFactory, PermissionsGuard, RoleRepository, PermissionRepository, SubjectRepository],
})
export class CaslModule { }
