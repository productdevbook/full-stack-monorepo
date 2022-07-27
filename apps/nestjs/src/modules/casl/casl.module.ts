import { Module } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AuthModule } from '../auth/auth.module'
import { PermissionRepository, RoleRepository, SubjectRepository } from './repositories'
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory'
import { PermissionsGuard } from '@/modules/casl/guards/permissions.guard'
import { UserModule } from '@/modules/user/user.module'
import { Permission, Role, Subject } from '@/entities'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Role, Permission, Subject] }), UserModule, AuthModule],
  providers: [CaslAbilityFactory, PermissionsGuard, RoleRepository, PermissionRepository, SubjectRepository],
  exports: [CaslAbilityFactory, PermissionsGuard, RoleRepository, PermissionRepository, SubjectRepository],
})
export class CaslModule { }
