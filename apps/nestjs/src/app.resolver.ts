import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

@InputType()
export class ExampleInput {
  @Field(() => GraphQLJSON)
    info!: JSON
}

@Resolver()
export class AuthResolver {
  @Query(() => String)
  async example(@Args('data') data: ExampleInput) {
    // eslint-disable-next-line no-console
    console.log(data)
    return 'test'
  }
}

