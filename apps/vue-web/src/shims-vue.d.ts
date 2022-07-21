/// <reference types="vite/client" />
/// <reference types="@oku/api/types/schema" />
/// <reference types="vue-app/shims-vue" />

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