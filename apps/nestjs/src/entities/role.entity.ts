import { Collection, Entity, ManyToMany, OneToMany, Property, Unique } from '@mikro-orm/core'

import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { PageMenuRole } from './page-menu-role.entity'
import { User } from './user.entity'
import { Permission } from './permission.entity'

@Entity({ tableName: 'role' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Role extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string

  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    description!: string

  @OneToMany(() => PageMenuRole, p => p.role, {
    eager: true,
    nullable: true,
    orphanRemoval: true,
  })
  @Field(() => [PageMenuRole], { nullable: true })
    pageMenus = new Collection<PageMenuRole>(this)

  @ManyToMany(() => User, 'roles', { owner: true })
  @Field(() => [User], { nullable: true })
    users = new Collection<User>(this)

  @ManyToMany(() => Permission, 'roles', { owner: true })
  @Field(() => [Permission], { nullable: true })
    permissions = new Collection<Permission>(this)
}
