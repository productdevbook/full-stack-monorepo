import { Field, InputType } from '@nestjs/graphql'

@InputType()
// bu input hem remove için hem add için kullanılıyor daha uygun bi isim gerekiyor
export class AddPermissionInput {
  @Field()
    permissionId!: string

  @Field()
    roleId!: string
}
