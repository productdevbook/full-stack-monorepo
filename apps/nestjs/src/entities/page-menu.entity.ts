import { Collection, Entity, ManyToOne, OneToMany } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { Menu } from './menu.entity'
import { Page } from './page.entity'
import { PageMenuRole } from './page-menu-role.entity'

@Entity({ tableName: 'pageMenu' })
@ObjectType()
export class PageMenu extends BaseModel {
  @ManyToOne({
    entity: () => Menu,
    eager: false,
    onDelete: 'CASCADE',
  })
  @Field(() => Menu, { nullable: true })
    menu?: Menu | null

  @ManyToOne({
    entity: () => Page,
    eager: false,
    onDelete: 'CASCADE',
  })
  @Field(() => Page, { nullable: true })
    page?: Page | null

  @OneToMany(() => PageMenuRole, p => p.pageMenu, {
    eager: true,
    nullable: true,
  })
  @Field(() => [PageMenuRole], { nullable: true })
    roles = new Collection<PageMenuRole[]>(this)
}
