import { registerEnumType } from '@nestjs/graphql'

export enum ActionEnum {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

registerEnumType(ActionEnum, {
  name: 'ActionEnum',
})
