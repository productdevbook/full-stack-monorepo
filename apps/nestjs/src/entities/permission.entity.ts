import { Collection, Entity, Enum, ManyToMany, ManyToOne } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { Role } from './role.entity'
import { Subject } from './subject.entity'
import { ActionEnum } from '@/modules/casl/interfaces/action.enum'

@Entity({ tableName: 'permission' })
@ObjectType()
export class Permission extends BaseModel {
  @ManyToOne({
    eager: true,
    nullable: true,
  })
  @Field(() => Subject)
    subject = new Collection<Subject>(this)

  @ManyToMany(() => Role, 'permissions', { owner: true })
  @Field(() => [Role])
    roles = new Collection<Role>(this)

  @Enum(() => ActionEnum)
  @Field(() => ActionEnum)
    action!: ActionEnum
}
