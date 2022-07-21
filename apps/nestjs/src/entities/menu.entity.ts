import { Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { PageMenu } from './page-menu.entity'
@Entity({ tableName: 'menu' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Menu extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    icon!: string

  @Property({ type: 'int4', default: 0, nullable: false })
  @Field(() => Number, { nullable: false })
    order!: number

  @Property({ type: 'bool', nullable: false, default: false })
  @Field(() => Boolean, { nullable: false })
    isActive!: boolean

  @ManyToOne({ entity: () => Menu, eager: false })
  @Field(() => Menu, { nullable: true })
    parentMenu?: Menu | null

  @OneToMany(() => Menu, menu => menu.parentMenu, {
    eager: true,
  })
  @Field(() => [Menu], { nullable: true })
    childMenus?: Menu[] | null

  @OneToMany(() => PageMenu, p => p.menu, {
    eager: true,
  })
  @Field(() => [PageMenu], { nullable: true })
    pageMenus?: PageMenu[] | null
}
