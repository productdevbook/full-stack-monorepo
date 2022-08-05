import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { UserSetting } from './user-setting.entity'
import { City } from './city.entity'

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

  @Property({ type: 'varchar', length: 10, nullable: false })
  @Field(() => String, { nullable: false })
    stateCode!: string

  @Property({ type: 'float8', length: 200, nullable: false })
  @Field(() => Number, { nullable: false })
    latitude!: number

  @Property({ type: 'float8', length: 200, nullable: false })
  @Field(() => Number, { nullable: false })
    longitude!: number

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    wikiDataId!: string

  @ManyToOne({ entity: () => City })
  @Field(() => City)
    city!: City

  @OneToMany(() => UserSetting, userSetting => userSetting.state, {
    eager: true,
  })
  @Field(() => [UserSetting])
    userSettings = new Collection<UserSetting>(this)

  constructor(props: Partial<State> = {}) {
    Object.assign(this, props)
  }
}
