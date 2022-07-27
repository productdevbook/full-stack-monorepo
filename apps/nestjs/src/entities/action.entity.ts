import { Collection, Entity, Enum, ManyToMany, ManyToOne } from '@mikro-orm/core'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { Role } from './role.entity'
import { Subject } from './subject.entity'

export enum ActionEnum {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity({ tableName: 'action' })
@ObjectType()
export class Action extends BaseModel {
  @ManyToOne({
    eager: true,
    nullable: true,
  })
  @Field(() => [Subject], { nullable: true })
    subject = new Collection<Subject>(this)

  @ManyToMany(() => Role)
  @Field(() => [Role], { nullable: true })
    roles = new Collection<Role>(this)

  @Enum(() => ActionEnum)
  @Field(() => [Role], { nullable: true })
    action!: ActionEnum
}

registerEnumType(ActionEnum, {
  name: 'ActionEnum',
})
