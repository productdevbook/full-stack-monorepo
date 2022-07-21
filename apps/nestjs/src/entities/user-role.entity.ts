import { Cascade, Entity, ManyToOne, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { Role } from './role.entity'
import { User } from './user.entity'

@Entity({ tableName: 'userRole' })
@Unique({ properties: ['role', 'user'] })
@ObjectType()
export class UserRole extends BaseModel {
  @ManyToOne(() => Role, {
    eager: false,
    nullable: false,
    cascade: [Cascade.REMOVE],
  })
  @Field(() => Role, { nullable: false })
    role?: Role

  @ManyToOne(() => User, {
    eager: false,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Field(() => User, { nullable: false })
    user?: User
}
