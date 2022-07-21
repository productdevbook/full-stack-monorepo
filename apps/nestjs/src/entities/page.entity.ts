import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'
import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { PageMenu } from './page-menu.entity'

@Entity({ tableName: 'page' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Page extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    url!: string

  @OneToMany(() => PageMenu, p => p.page, {
    eager: true,
    nullable: true,
  })
  @Field(() => [PageMenu], { nullable: true })
    pageMenus = new Collection<PageMenu>(this)

  @Property({ type: 'bool', nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
    isPublic!: boolean

  @Property({ type: 'bool', nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
    isSql!: boolean

  @Property({ type: 'bool', nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
    isOrganization!: boolean

  @Property({ type: 'text', nullable: true })
  @HideField()
    sql?: string | null

  @Property({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
    columns?: string | null
}
