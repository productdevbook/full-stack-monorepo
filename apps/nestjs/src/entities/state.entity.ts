import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Collection, Entity, IdentifiedReference, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
// import { BaseModel } from './base.model'
// import { City } from './city.entity'
import { UserSetting } from './user-setting.entity'
// import { Currency } from './currency.entity'
import { Country } from './country.entity'

export interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

@Entity({ tableName: 'state' })
@ObjectType()
export class State {
  @Field(() => ID)
  @PrimaryKey({ type: 'number' })
    id!: number

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    countryCode!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    countryName!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    stateCode!: string

  @Property({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
    type!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    latitude!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    longitude!: string

  @ManyToOne({ entity: () => Country })
  @Field(() => Country)
    country!: Country

  @OneToMany(() => UserSetting, userSetting => userSetting.state, {
    eager: true,
  })
  @Field(() => [UserSetting])
    userSettings = new Collection<UserSetting>(this)

  constructor(props: Partial<State> = {}) {
    Object.assign(this, props)
  }
}
