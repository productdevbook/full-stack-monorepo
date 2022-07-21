import { Field, ObjectType } from '@nestjs/graphql'
import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'
import { SiteThemeEnum } from '../enums/database'
import { UserSetting } from './user-setting.entity'
import { BaseModel } from './base.model'

@Entity({ tableName: 'site_theme' })
@Unique({ properties: ['name'] })
@ObjectType()
export class SiteTheme extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => SiteThemeEnum, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: false, default: 't' })
  @Field(() => String, { nullable: false })
    code!: string

  @OneToMany(() => UserSetting, setting => setting.siteTheme, {
    eager: true,
    nullable: false,
  })
  @Field(() => [UserSetting], { nullable: false })
    userSettings= new Collection<UserSetting>(this)
}
