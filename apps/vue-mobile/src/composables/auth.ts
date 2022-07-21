import { AuthClient, AuthOptions } from '@productdevbook/auth'
import axios from 'axios'
const uri = import.meta.env.VITE_GRAPHQL_ENDPOINT

const ip = import.meta.env.VITE_SERVER_URL
export function useAuth() {
  const customOptions = {
    errorProperty: 'errors',
    baseURL: uri || `http://${ip}:4000`,
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
      autoFetch: true,
      property: 'data.me',
      storageName: 'user',
      graphqlQuery: {
        query: `query Userme {
            me {
              name
              email
              emailVerified
              id
            }
          }`,
        variables: {},
        operationName: 'Userme',
      },
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
      home: '/app/home',
      login: '/auth/login',
      logout: '/auth/login',
    },
    storage: {
      driver: 'capacitor',
      async: true,
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
