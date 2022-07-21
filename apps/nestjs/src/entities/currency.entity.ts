import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { UserSetting } from './user-setting.entity'

@Entity({ tableName: 'currency' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Currency extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    code!: string

  @OneToMany(() => UserSetting, userSetting => userSetting.currency, {
    eager: true,
  })
  @Field(() => [UserSetting])
    userSettings = new Collection<UserSetting>(this)
}
