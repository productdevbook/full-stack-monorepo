import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class PageData {
  @Field()
  public count?: number

  @Field()
  public limit?: number

  @Field()
  public offset?: number
}
