export interface JwtArgs {
  id: string
  roles?: string[]
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
  permissions?: string[]

  aud?: string
  iss?: string
}
