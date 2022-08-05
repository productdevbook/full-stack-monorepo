import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Country } from './country.entity'
import { State } from './state.entity'
import { UserSetting } from './user-setting.entity'

@Entity({ tableName: 'city' })
@Unique({ properties: ['name', 'country'] })
@ObjectType()
export class City {
  @Field(() => ID)
  @PrimaryKey({ type: 'number' })
    id = 0

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'float8', length: 200, nullable: false })
  @Field(() => Number, { nullable: false })
    latitude!: number

  @Property({ type: 'float8', length: 200, nullable: false })
  @Field(() => Number, { nullable: false })
    longitude!: number

  @ManyToOne({ entity: () => Country, eager: false })
  @Field(() => Country)
    country?: Country

  @Property({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
    type!: string

  @OneToMany(() => State, state => state.city, {
    eager: true,
    orphanRemoval: true,
  })
  @Field(() => [State])
    states? = new Collection<State>(this)

  @OneToMany(() => UserSetting, userSetting => userSetting.city, {
    eager: true,
    orphanRemoval: true,
  })
  @Field(() => [UserSetting])
    userSettings? = new Collection<UserSetting>(this)

  constructor(props: Partial<City> = {}) {
    Object.assign(this, props)
  }
}
