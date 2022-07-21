import { Pinia } from 'pinia'
import type { App } from 'vue'
import type { RouteLocationRaw, RouteRecordRaw, Router } from 'vue-router'
import { AxiosInstance } from 'axios'
import { SubmissionContext } from 'vee-validate'
import en from 'oku-i18n/src/locales/en-US.json'

interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  pinia: Pinia
  axios: AxiosInstance
}

export type AppModule = (ctx: AppContext) => void

export interface ISubmit<T> {
  values: T
  ctx: SubmissionContext<Record<string, any>>
}
type MessageSchema = typeof en

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  pinia: Pinia
  axios: AxiosInstance
}

export interface MobileMenuInterface {
  id?: number
  to?: RouteLocationRaw
  icon?: string
  number?: number
  img?: string
  newData?: boolean
  color?: 'white' | 'black'
  hidden?: boolean
}

export type typeDark = 'light' | 'dark' | 'auto'

export type SelectedTheme = 'auto' | 'light' | 'dark'
export type ActualTheme = 'light' | 'dark'

export function sanitiseSelectedTheme(userInput: string): SelectedTheme {
  if (userInput === 'auto' || userInput === 'light' || userInput === 'dark')
    return userInput

  return 'auto'
}

