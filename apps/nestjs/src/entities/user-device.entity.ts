import { Collection, Entity, ManyToOne, Property } from '@mikro-orm/core'
import { Field, ObjectType } from '@nestjs/graphql'
import UAParser from 'ua-parser-js'
import { DateTimeResolver } from 'graphql-scalars'
import { BaseModel } from './base.model'
import { User } from './user.entity'
import { TimestampType } from '@/core/transformer'

@ObjectType('UserAgentBrowser')
export class GraphQLUserAgentBrowser implements UAParser.IBrowser {
  @Field(() => String, { description: 'Browser major', nullable: true })
    major: string | undefined

  @Field(() => String, { description: 'Browser name', nullable: true })
    name: string | undefined

  @Field(() => String, { description: 'Browser version', nullable: true })
    version: string | undefined
}
@ObjectType('UserAgentCPU')
export class GraphQLUserAgentCPU implements UAParser.ICPU {
  @Field(() => String, { description: 'CPU architecture', nullable: true })
    architecture: string | undefined
}
@ObjectType('UserAgentDevice')
export class GraphQLUserAgentDevice implements UAParser.IDevice {
  @Field(() => String, { description: 'Device model', nullable: true })
    model: string | undefined

  @Field(() => String, { description: 'Device type', nullable: true })
    type: string | undefined

  @Field(() => String, { description: 'Device vendor', nullable: true })
    vendor: string | undefined
}
@ObjectType('UserAgentEngine')
export class GraphQLUserAgentEngine implements UAParser.IEngine {
  @Field(() => String, { description: 'Engine name', nullable: true })
    name: string | undefined

  @Field(() => String, { description: 'Engine version', nullable: true })
    version: string | undefined
}
@ObjectType('UserAgentOS')
export class GraphQLUserAgentOS implements UAParser.IOS {
  @Field(() => String, { description: 'OS name', nullable: true })
    name: string | undefined

  @Field(() => String, { description: 'OS version', nullable: true })
    version: string | undefined
}

@ObjectType('UserAgent')
export class GraphQLUserAgent implements UAParser.IResult {
  @Field(() => GraphQLUserAgentBrowser, { nullable: true })
    browser!: UAParser.IBrowser

  @Field(() => GraphQLUserAgentCPU)
    cpu!: UAParser.ICPU

  @Field(() => GraphQLUserAgentDevice, { nullable: true })
    device!: UAParser.IDevice

  @Field(() => GraphQLUserAgentEngine)
    engine!: UAParser.IEngine

  @Field(() => GraphQLUserAgentOS)
    os!: UAParser.IOS

  @Field()
    ua!: string
}

@Entity({ tableName: 'user_device' })
@ObjectType('UserDevice')
export class UserDeviceEntity extends BaseModel {
  @Field({
    description: 'device fingerprint',
  })
  @Property({
    comment: 'device fingerprint',
  })
    fingerprint!: string

  @Field({
    description: 'login token jit',
    nullable: true,
  })
  @Property({
    comment: 'login token jit',
    nullable: true,
  })
    token?: string

  @Field({
    description: 'device name',
  })
  @Property({
    comment: 'device name',
  })
    name!: string

  @Field({
    description: 'Equipment type',
  })
  @Property({
    comment: 'Equipment type',
  })
    type!: string

  @Field(() => GraphQLUserAgent, {
    description: 'device UA',
  })
  @Property({
    type: 'json',
    name: 'user_agent',
    comment: 'device UA',
  })
    userAgent!: UAParser.IResult

  @Field(() => DateTimeResolver, {
    description: 'last login time',
  })
  @Property({
    type: TimestampType,
    name: 'last_login_at',
    comment: 'last login time',
  })
    lastLoginAt!: Date | null

  @Field(() => String, {
    description: 'Last login IP',
    nullable: true,
  })
  @Property({
    name: 'last_login_ip',
    comment: 'Last login IP',
  })
    lastLoginIp: string | undefined

  @Field(() => DateTimeResolver, {
    description: 'Device first login time',
  })
  @Property({
    type: TimestampType,
    name: 'first_login_at',
    comment: 'Device first login time',
  })
    firstLoginAt!: Date | null

  @Field(() => String, {
    description: 'Device first login IP',
    nullable: true,
  })
  @Property({
    name: 'first_login_ip',
    comment: 'Device first login IP',
  })
    firstLoginIp: string | undefined

  @Field(() => User, {
    description: 'owning user',
  })
  @ManyToOne({ entity: () => User })
    user = new Collection<UserDeviceEntity>(this)
}
