import * as Relay from 'graphql-relay'
import { Field, ObjectType } from '@nestjs/graphql'
import { Type } from '@nestjs/common'
import PageData from './page-data'

const typeMap: any = {}

export default function relayTypes<T>(type: Type<T>): any {
  const { name } = type
  if (typeMap[`${name}`])
    return typeMap[`${name}`]

  @ObjectType(`${name}Edge`, { isAbstract: true })
  class Edge implements Relay.Edge<T> {
    public name = `${name}Edge`

    @Field(() => String, { nullable: false })
    public cursor!: Relay.ConnectionCursor

    @Field(() => type, { nullable: false })
    public node!: T
  }

  @ObjectType(`${name}PageInfo`, { isAbstract: true })
  class PageInfo implements Relay.PageInfo {
    @Field(() => String, { nullable: true })
    public startCursor!: Relay.ConnectionCursor | null

    @Field(() => String, { nullable: true })
    public endCursor!: Relay.ConnectionCursor | null

    @Field(() => Boolean)
    public hasPreviousPage!: boolean

    @Field(() => Boolean)
    public hasNextPage!: boolean
  }

  @ObjectType(`${name}Connection`, { isAbstract: true })
  abstract class Connection implements Relay.Connection<T> {
    public name = `${name}Connection`

    @Field(() => [Edge], { nullable: false })
    public edges!: Relay.Edge<T>[]

    @Field(() => PageInfo, { nullable: false })
    public pageInfo!: Relay.PageInfo

    @Field(() => PageData, { nullable: false })
    public pageData!: PageData
  }

  typeMap[`${name}`] = Connection
  return typeMap[`${name}`]
}
