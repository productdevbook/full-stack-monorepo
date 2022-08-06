import { UseGuards } from '@nestjs/common'
import { Args, Field, InputType, Query, Resolver } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { CheckPermissions } from './modules/casl/decorators/check-permissions.decorator'
import { PermissionsGuard } from './modules/casl/guards/permissions.guard'
import { ActionEnum } from '@/modules/casl/interfaces/action.enum'

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

  @UseGuards(PermissionsGuard)
  @CheckPermissions([ActionEnum.CREATE, 'TODO'])
  @Query(() => String)
  async permiswork() {
    return 'perm works'
  }

  @UseGuards(PermissionsGuard)
  @CheckPermissions([ActionEnum.DELETE, 'TODO'])
  @Query(() => String)
  async permiswork2() {
    return 'perm works'
  }
}

