import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core'

import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { UserRole } from './user-role.entity'
import { PageMenuRole } from './page-menu-role.entity'

@Entity({ tableName: 'role' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Role extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: true })
  @Field(() => String, { nullable: true })
    name_en?: string | null

  // @OneToMany(() => UserRole, r => r.role, {
  //   eager: true,
  //   nullable: false,
  // })
  // @Property({ type: 'json', nullable: true })
  // @Field(() => GraphQLJSON, { nullable: true })
  //   permissions!: object

  @Field(() => [UserRole], { nullable: false })
    userRoles?: UserRole[]

  @OneToMany(() => PageMenuRole, p => p.role, {
    eager: true,
    nullable: true,
    orphanRemoval: true,
  })
  @Field(() => [PageMenuRole], { nullable: true })
    pageMenus = new Collection<PageMenuRole>(this)
}
