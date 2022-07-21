import { StringValue } from 'ms'

export interface ISingleJwt {
  time: StringValue
  cookieName: string
}

export interface IJwt {
  private: string
  public: string
  access: ISingleJwt
  refresh: ISingleJwt
  cookieRefresh: string
  aud: string
  iss: string
  expirationTime: StringValue
}
