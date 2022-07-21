import { BaseEntity, Index, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as randomUUID } from 'uuid'

import { Field, ID, ObjectType } from '@nestjs/graphql'
import { DateTimeResolver } from 'graphql-scalars'

@ObjectType()
export class BaseModel extends BaseEntity<BaseModel, 'id'> {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
    id: string = randomUUID()

  @Field(() => DateTimeResolver, { nullable: false })
  @Property({ type: 'Date', onCreate: () => new Date() })
  @Index()
    createdAt?: Date = new Date()

  @Field(() => DateTimeResolver, { nullable: true })
  @Property({ type: 'Date', onUpdate: () => new Date() })
    updatedAt?: Date

  @Field(() => DateTimeResolver, { nullable: true })
  @Property({ type: 'Date', lazy: true })
    deletedAt?: Date

  @Field(() => Boolean, { nullable: false })
  @Property({ type: 'bool', default: false })
    deleted? = false

  @Field(() => Boolean, { nullable: false })
  @Property({ type: 'bool', default: false })
    hidden? = false

  @Field(() => Boolean, { nullable: false })
  @Property({ type: 'bool', default: false })
    disabled? = false

  @Field(() => Boolean, { nullable: false })
  @Property({ type: 'bool', default: false })
    archived? = false

  constructor() {
    super()
    this.id = randomUUID()
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public softRemove(): void {
    this.deletedAt = new Date()
  }
}
