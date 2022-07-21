import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'

@ObjectType()
export class SqlData {
  @Field(() => GraphQLJSON, { nullable: true })
    datas?: object | null
}
