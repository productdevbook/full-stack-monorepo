import { Entity, ManyToOne, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { PageMenu } from './page-menu.entity'
import { Page } from './page.entity'
import { Role } from './role.entity'

@Entity({ tableName: 'pageMenuRole' })
@Unique({ properties: ['pageMenu', 'role'] })
@ObjectType()
export class PageMenuRole extends BaseModel {
  @ManyToOne({
    entity: () => PageMenu,
    eager: false,
    onDelete: 'CASCADE',
  })
  @Field(() => Page)
    pageMenu?: PageMenu

  @ManyToOne({ entity: () => Role, eager: false })
  @Field(() => Role)
    role?: Role
}
