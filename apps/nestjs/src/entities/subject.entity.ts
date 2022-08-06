import { Entity, Property, Unique } from '@mikro-orm/core'

import { Field, ObjectType } from '@nestjs/graphql'
import { BaseModel } from './base.model'

@Entity({ tableName: 'subject' })
@Unique({ properties: ['name'] })
@ObjectType()
export class Subject extends BaseModel {
  @Property({ type: 'varchar', length: 200, nullable: false })
  @Field(() => String, { nullable: false })
    name!: string
}
