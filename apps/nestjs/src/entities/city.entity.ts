import { Collection, Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { Country } from './country.entity'
import { UserSetting } from './user-setting.entity'

@Entity({ tableName: 'city' })
@Unique({ properties: ['name', 'country'] })
@ObjectType()
export class City extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @ManyToOne({ entity: () => Country, eager: false })
  @Field(() => Country)
    country?: Country

  @OneToMany(() => UserSetting, userSetting => userSetting.city, {
    eager: true,
    orphanRemoval: true,
  })
  @Field(() => [UserSetting])
    userSettings? = new Collection<UserSetting>(this)
}
