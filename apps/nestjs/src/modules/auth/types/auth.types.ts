import { Field, HideField, ObjectType } from '@nestjs/graphql'
import UAParser from 'ua-parser-js'

import { DateTimeResolver } from 'graphql-scalars'
import { GraphQLUserAgent } from '@/entities/user-device.entity'

@ObjectType()
export class Session {
  @Field(() => GraphQLUserAgent, { description: 'Device info', nullable: true })
    device!: UAParser.IResult

  @HideField()
    hashedJWT!: string

  @Field({
    description: 'Jit',
  })
    jit!: string

  @Field({ description: 'Device IP' })
    ip!: string

  @Field(() => DateTimeResolver, { description: 'Session creation date', nullable: true })
    createdDate!: string
}
