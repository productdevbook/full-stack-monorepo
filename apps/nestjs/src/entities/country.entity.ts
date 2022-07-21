import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { City } from './city.entity'
import { UserSetting } from './user-setting.entity'
import { State } from './state.entity'

export interface Timezone {
  zoneName: string
  gmtOffset: number
  gmtOffsetName: string
  abbreviation: string
  tzName: string
}

@Entity({ tableName: 'country' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Country {
  @Field(() => ID)
  @PrimaryKey({ type: 'number' })
    id = 0

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    iso3: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    iso2: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    numericCode: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    phoneCode: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    capital: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    currency: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    currencyName: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    currencySymbol: string | null = null

  @Property({ type: 'varchar', length: 100, nullable: false })
  @Field(() => String, { nullable: false })
    tld: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    native: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    region: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    subRegion: string | null = null

  @Property({ type: 'varchar', length: 20000, nullable: false })
  @Field(() => String, { nullable: false })
    timeZones: Timezone | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    latitude: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    longitude: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    emoji: string | null = null

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    emojiU: string | null = null

  @OneToMany(() => City, city => city.country, { eager: true })
  @Field(() => [City])
    cities = new Collection<City>(this)

  @OneToMany(() => State, state => state.country)
  @Field(() => [State])
    states = new Collection<State>(this)

  @OneToMany(() => UserSetting, userSetting => userSetting.country, {
    eager: true,
  })
  @Field(() => [UserSetting])
    userSettings= new Collection<UserSetting>(this)

  constructor(props: Partial<Country> = {}) {
    Object.assign(this, props)
  }
}
