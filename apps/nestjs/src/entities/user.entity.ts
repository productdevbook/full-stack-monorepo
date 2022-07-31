import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Cascade, Collection, Entity, ManyToMany, OneToMany, OneToOne, Property, Unique } from '@mikro-orm/core'
import { DateTimeResolver } from 'graphql-scalars'
import { BaseModel } from './base.model'

import { UserSetting } from './user-setting.entity'
import { UserDeviceEntity } from './user-device.entity'
import { NotificationToken } from './notification-token.entity'
import { Role } from './role.entity'
import { TimestampType } from '@/core/transformer'

@Entity({ tableName: 'user' })
@ObjectType()
export class User extends BaseModel {
  @Property({ nullable: true })
  @Unique()
    providerAccountId?: string

  @Property({ type: 'varchar', nullable: false, unique: true })
  @Field(() => String, { description: 'Example field (username)' })
    username!: string

  @Property({ type: 'varchar', nullable: false })
  @Field(() => String, { description: 'Example field (name)' })
    name!: string

  @Property({ type: 'varchar', nullable: false })
  @Field(() => String, { description: 'Example field (email)' })
  @Unique()
    email!: string

  @Field(() => DateTimeResolver, { description: 'Example field (emailVerified)' })
  @Property({ type: 'Date', nullable: true })
    emailVerified?: Date

  @Property({ type: 'varchar', nullable: false })
  @HideField()
    password!: string

  @HideField()
  @Property({ hidden: true })
    passwordSalt!: string

  @Property({ type: 'varchar', nullable: false })
  @Field(() => String, { description: 'Example field (display name)' })
    displayName!: string

  @Property({ type: 'varchar', nullable: true })
  @Field(() => String, { description: 'Example field (placeholder)' })
    image?: string

  @Property({ type: 'bool', nullable: false, default: false })
  @Field(() => String, { description: 'Example field (placeholder)' })
    isTermsAccepted!: boolean

  @Field(() => DateTimeResolver, {
    description: 'last login time',
  })
  @Property({
    type: TimestampType,
    comment: 'last login time',
    default: null,
  })
    lastLoginAt?: Date

  @Field(() => String, {
    description: 'Last login IP',
  })
  @Property({
    comment: 'Last login IP',
    default: null,
  })
    lastLoginIp?: string

  @Field(() => [UserDeviceEntity],
    {
      description: 'User devices',
      nullable: true,
    },
  )
  @OneToMany({ entity: () => UserDeviceEntity, mappedBy: (session: UserDeviceEntity) => session.user, cascade: [Cascade.ALL], orphanRemoval: true })
    devices = new Collection<UserDeviceEntity>(this)

  @Field(() => [NotificationToken],
    {
      description: 'User notification tokens',
      nullable: true,
    },
  )
  @OneToMany({ entity: () => NotificationToken, mappedBy: (token: NotificationToken) => token.createdBy, cascade: [Cascade.ALL], orphanRemoval: true })
    notificationToken = new Collection<NotificationToken>(this)

  @ManyToMany(() => Role, 'users', { owner: true })
  @Field(() => [Role], { nullable: true })
    roles = new Collection<Role>(this)

  @Field(() => UserSetting, { nullable: false })
  @OneToOne(() => UserSetting, user => user.user, {
    owner: true,
    nullable: false,
    orphanRemoval: true,
  })
    userSetting?: UserSetting
}
