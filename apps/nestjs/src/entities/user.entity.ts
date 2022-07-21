import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Cascade, Collection, Entity, OneToMany, OneToOne, Property, Unique } from '@mikro-orm/core'
import { DateTimeResolver } from 'graphql-scalars'
import { BaseModel } from './base.model'

// import { UserRole } from './user-role.entity'
import { UserSetting } from './user-setting.entity'
import { UserDeviceEntity } from './user-device.entity'
import { NotificationToken } from './notification-token.entity'
import { TimestampType } from '@/core/transformer'
import { EncryptedType } from '@/core/utils/encrypted-type'

// const transformer: Record<'date' | 'bigint', ValueTransformer> = {
//   date: {
//     from: (date: string | null) => date && new Date(parseInt(date, 10)),
//     to: (date?: Date) => date?.valueOf().toString(),
//   },
//   bigint: {
//     from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
//     to: (bigInt?: number) => bigInt?.toString(),
//   },
// }

@Entity({ tableName: 'user' })
@ObjectType()
export class User extends BaseModel {
  @Property({ nullable: true })
  @Unique()
    providerAccountId?: string

  @Property({ type: 'varchar', nullable: false, unique: true })
  @Field(() => String, { description: 'Example field (username)' })
    username!: string

  @Property({ type: EncryptedType, nullable: false })
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
    is_terms_accepted!: boolean

  @Field(() => DateTimeResolver, {
    description: 'last login time',
  })
  @Property({
    type: TimestampType,
    name: 'last_login_at',
    comment: 'last login time',
    default: null,
  })
    lastLoginAt?: Date

  @Field(() => String, {
    description: 'Last login IP',
  })
  @Property({
    name: 'last_login_ip',
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

  // @OneToMany(() => UserRole, p => p.role, {
  //   eager: true,
  //   nullable: false,
  // })
  // @Field(() => [UserRole], { nullable: false })
  //   userRoles!: UserRole[]

  @Field(() => UserSetting, { nullable: false })
  @OneToOne(() => UserSetting, user => user.user, {
    owner: true,
    nullable: false,
    orphanRemoval: true,
  })
    userSetting?: UserSetting
}
