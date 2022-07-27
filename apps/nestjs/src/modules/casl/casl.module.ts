import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AuthModule } from '../auth/auth.module'
import { PermissionRepository, RoleRepository, SubjectRepository } from './repositories'
import { RoleService } from './services/role.service'
import { PermissionService } from './services/permission.service'
import { SubjectService } from './services/subject.service'
import { SubjectResolver } from './resolvers/subject.resolver'
import { Permission, Role, Subject } from '@/entities'
import { PermissionsGuard } from '@/modules/casl/guards/permissions.guard'
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Role, Permission, Subject] }), AuthModule],
  providers: [
    CaslAbilityFactory,
    PermissionsGuard,
    RoleRepository,
    PermissionRepository,
    SubjectRepository,
    RoleService,
    PermissionService,
    SubjectService,
    SubjectResolver],
  exports: [CaslAbilityFactory, PermissionsGuard, RoleRepository, PermissionRepository, SubjectRepository],
})
export class CaslModule { }
