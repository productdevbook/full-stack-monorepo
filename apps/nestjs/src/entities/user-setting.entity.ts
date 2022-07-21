import { Field, ObjectType } from '@nestjs/graphql'

import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { BaseModel } from './base.model'
import { User } from './user.entity'
import { SiteLanguage } from './site-language.entity'
import { SiteTheme } from './site-theme.entity'
import { Country } from './country.entity'
import { City } from './city.entity'
import { Currency } from './currency.entity'
import { State } from './state.entity'

@Entity({ tableName: 'user_setting' })
@Unique({ properties: ['user'] })
@ObjectType()
export class UserSetting extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
    timezone?: string | null

  @Field(() => [User],
    {
      description: 'User devices',
      nullable: true,
    },
  )
  @ManyToOne({ entity: () => User, nullable: false })
    user!: User

  @ManyToOne({
    entity: () => SiteLanguage,
    eager: false,
    nullable: true,
  })
  @Field(() => SiteLanguage, { nullable: true })
    siteLanguage?: SiteLanguage

  @ManyToOne({
    entity: () => SiteTheme,
    eager: false,
    nullable: true,
  })
  @Field(() => SiteTheme, { nullable: true })
    siteTheme?: SiteTheme

  @ManyToOne({
    entity: () => Country,
    eager: false,
    nullable: true,
  })
  @Field(() => Country, { nullable: true })
    country?: Country

  @ManyToOne({
    entity: () => City,
    eager: false,
    nullable: true,
  })
  @Field(() => City, { nullable: true })
    city?: City

  @ManyToOne({
    entity: () => Currency,
    eager: false,
    nullable: true,
  })
  @Field(() => Currency, { nullable: true })
    currency?: Currency

  @ManyToOne({
    entity: () => State,
    eager: false,
    nullable: true,
  })
  @Field(() => State, { nullable: true })
    state?: State
}
