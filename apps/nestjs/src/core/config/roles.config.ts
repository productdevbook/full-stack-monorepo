import { NonFunctionKeys } from 'utility-types'

export const ROLE_LEVEL = {
  User: 1,
  Organization: 2,
  Admin: 3,
}

export type Roles = NonFunctionKeys<typeof ROLE_LEVEL>

export interface Role {
  id: string
  name_en: Roles | string
  permissions?: object
}
