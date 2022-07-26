import { Module } from '@nestjs/common'
import { CaslAbilityFactory } from '@/modules/casl/casl-ability.factory'
import { PermissionsGuard } from '@/modules/casl/guards/permissions.guard'
import { UserModule } from '@/modules/user/user.module'

@Module({
  imports: [UserModule],
  providers: [CaslAbilityFactory, PermissionsGuard],
  exports: [CaslAbilityFactory, PermissionsGuard],
})
export class CaslModule {}
