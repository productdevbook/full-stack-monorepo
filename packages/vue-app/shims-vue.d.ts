/// <reference types="vite/client" />

import { MessageApi, NotificationApi } from 'naive-ui'

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window { 
    $message: MessageApi
    $notication: NotificationApi
  }
}