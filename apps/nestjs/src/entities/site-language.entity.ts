import { Field, ObjectType } from '@nestjs/graphql'
import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'

import { UserSetting } from './user-setting.entity'
import { BaseModel } from './base.model'

@Entity({ tableName: 'site_language' })
@Unique({ properties: ['name'] })
@ObjectType()
export class SiteLanguage extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
    name_en?: string | null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    code!: string

  @OneToMany(() => UserSetting, userSetting => userSetting.siteLanguage, {
    eager: true,
    nullable: false,
    orphanRemoval: true,
  })
  @Field(() => [UserSetting], { nullable: false })
    userSettings = new Collection<UserSetting>(this)
}
