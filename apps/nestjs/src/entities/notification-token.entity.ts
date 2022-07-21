import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'
import { User } from './user.entity'

@Entity({ tableName: 'notification_token' })
@Unique({ properties: ['token'] })
@ObjectType()
export class NotificationToken extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    token!: string

  @Property({ type: 'varchar', length: 500, nullable: false })
  @Field(() => String, { nullable: false })
    deviceId!: string

  @ManyToOne({ entity: () => User, nullable: false })
  @Field(() => User)
    createdBy!: User
}
