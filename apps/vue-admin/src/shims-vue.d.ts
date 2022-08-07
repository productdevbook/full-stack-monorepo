/// <reference types="vite/client" />
/// <reference types="@oku/api/types/schema" />
/// <reference types="vue-app/shims-vue" />

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


interface ImportMetaEnv {
  readonly VITE_GRAPHQL_ENDPOINT: string
  readonly VITE_GRAPHQL_ENDPOINT_WS: string
  readonly VITE_SENTRY_DNS: string
  readonly NODE_ENV: string
  readonly VITE_SENTRY_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}