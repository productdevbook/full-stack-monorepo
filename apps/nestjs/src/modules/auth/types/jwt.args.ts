import { Permission, Role } from '@/entities'

export interface JwtArgs {
  id: string
  roles?: Role[] | unknown
  /**
   * Issued at
   */
  iat?: number
  /**
   * Expiration time
   */
  exp?: number
  token_type?: 'access' | 'refresh'
  jti: string
  username: string
  permissions?: Permission[]

  aud?: string
  iss?: string
}
