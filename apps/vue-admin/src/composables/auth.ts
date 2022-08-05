import { AuthClient, AuthOptions } from '@productdevbook/auth'
import axios from 'axios'
export function useAuth() {
  const customOptions = {
    errorProperty: 'errors',
    baseURL: 'http://localhost:4000',
    endpoints: {
      login: {
        url: '/graphql',
        method: 'post',
      },
      logout: {
        url: '/graphql',
        method: 'post',
      },
      user: {
        url: '/graphql',
        method: 'post',
      },
      refresh: {
        url: '/graphql',
        method: 'post',
      },
      signup: {
        url: '/graphql',
        method: 'post',
      },
    },
    token: {
      property: 'data.signIn.accessToken',
      refreshProperty: 'data.signIn.refreshToken',
      autoDecode: true,
      name: 'Authorization',
      storageName: 'access-token',
      type: 'Bearer',
    },
    user: {
      autoFetch: false,
    },
    refreshToken: {
      property: 'data.refreshToken.refreshToken',
      accessTokenProperty: 'data.refreshToken.accessToken',
      refreshTokenProperty: 'data.refreshToken.refreshToken',
      name: 'data',
      autoLogout: true,
      storageName: 'refresh-token',
      enabled: true,
      maxAge: 7,
    },
    redirect: {
      home: '/onlogin',
      login: '/auth/login',
      logout: '/auth/login',
    },
    storage: {
      driver: 'cookie',
    },
    logout: {
      graphqlQuery: {
        query: `
          mutation logout {
            logout
          }
          `,
        variables: {},
        operationName: 'logout',
      },
    },
    // TODO: apiType ismi yapilacak
    restApiType: 'graphql',
  } as AuthOptions
  const auth = AuthClient({ axios, options: customOptions })

  return auth
}
export default useAuth
