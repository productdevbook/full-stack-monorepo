import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  Observable,
  Operation,
  fromPromise,
  split,
} from '@apollo/client/core'
import { InMemoryCache } from '@apollo/client/cache'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import type { Client } from 'graphql-ws'
import { createClient } from 'graphql-ws'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { asyncMap, getMainDefinition } from '@apollo/client/utilities'
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries'
import sha256 from 'crypto-js/sha256'
import { AppModule } from 'vue-app/types'
import { print } from 'graphql'
import { useAuth } from '~/composables/auth'
const uri = import.meta.env.VITE_GRAPHQL_ENDPOINT
const socket = import.meta.env.VITE_GRAPHQL_ENDPOINT_WS

const ip = import.meta.env.VITE_SERVER_URL
const dev = import.meta.env.dev

class WebSocketLink extends ApolloLink {
  private client: Client

  constructor(client: Client) {
    super()
    this.client = client
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((observer) => {
      return this.client.subscribe<FetchResult>(
        {
          ...operation,
          query: print(operation.query),
        },
        {
          next: observer.next.bind(observer),
          complete: observer.complete.bind(observer),
          error: observer.error.bind(observer),
        },
      )
    })
  }
}

// Create the subscription websocket link
const wsClient = createClient({
  // url: `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${
  //   window.location.host
  // }/api`,
  url: socket || `ws://${ip}:4000/subscriptions`,
  isFatalConnectionProblem: () => false,
  retryAttempts: Infinity,
})

// avoid duplicated online/offline event
let isOnline = false
wsClient.on('opened', () => {
  if (isOnline)
    return

  // events.online.dispatchEvent()
  isOnline = true
})
wsClient.on('closed', () => {
  if (!isOnline)
    return

  isOnline = false
  // events.offline.dispatchEvent()
})
const wsLink = new WebSocketLink(wsClient)

const httpLink = createUploadLink({
  uri: uri || `http://${ip}:4000/graphql`,
  credentials: 'same-origin',
})

const apqLink = createPersistedQueryLink({
  sha256: i => sha256(i).toString(),
})

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext()
  console.log(operation.getContext())
  operation.setContext(() => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  }))
  return forward(operation)
})
const splitLink = () => {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      )
    },
    authMiddleware.concat(wsLink),
    authMiddleware.concat(httpLink),
  )
}

const errorHandler = () => {
  const { refreshToken } = useAuth()
  return onError(({ graphQLErrors, networkError, operation, forward }): any => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        switch (err.message) {
          case 'Unauthorized':
            return fromPromise(refreshToken())
              .filter(value => Boolean(value))
              .flatMap((accessToken) => {
                const oldHeaders = operation.getContext().headers

                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                })
                return forward(operation)
              })
          case 'FORBIDDEN':
            // changeAppAccess(false)
            break
          default:
            if (dev) {
              // eslint-disable-next-line no-console
              console.log(graphQLErrors, 'graphQLErrors')
            }
            useToast(err.message, { color: 'warning' })
            return forward(operation)
        }
      }
    }
    else {
      // changeAppAccess(true)
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`)
    }
    return null
  })
}

const withToken = setContext(async () => {
  const { getToken } = useAuth()
  const token = await getToken()
  return { token }
})
// Cache implementation
const cache = new InMemoryCache({
  addTypename: false,
})

function apolloClient() {
  return new ApolloClient({
    link: ApolloLink.from([withToken, errorHandler(), splitLink()]),
    cache,
    connectToDevTools: !!dev,
  })
}
export { apolloClient }

export const install: AppModule = ({ app }) => {
  const apolloClient = new ApolloClient({
    link: ApolloLink.from([withToken, errorHandler(), splitLink()]),
    cache,
    connectToDevTools: !!dev,
  })
  app.provide(DefaultApolloClient, apolloClient)
}
