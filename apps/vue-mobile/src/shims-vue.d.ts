/// <reference types="vite/client" />
/// <reference types="@productdevbook/auth" />
/// <reference types="@oku/api/types/schema" />
/// <reference types="vue-app/shims-vue" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_GRAPHQL_URL: string
  readonly VITE_FIREBASE_CONFIG: string
  readonly VITE_CRISP_KEY: string
  readonly VITE_APP_VERSION: string
  readonly VITE_REVENU_ANDROID_ID: string
  readonly VITE_REVENU_IOS_ID: string
  readonly VITE_AD_ID: string
  readonly VITE_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}



