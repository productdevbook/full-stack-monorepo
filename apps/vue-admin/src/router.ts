import {
  NavigationGuard,
  NavigationHookAfter,
  createRouter,
  createWebHistory,
} from 'vue-router'
import { isSupportedLocale } from 'vue-app/utils'
import * as NProgress from 'nprogress'
import { useCookies } from '@vueuse/integrations/useCookies'

/**
 * routes are generated using vite-plugin-pages
 * each .vue files located in the ./src/pages are registered as a route
 * @see https://github.com/hannoeru/vite-plugin-pages/blob/main/examples/vue/src/main.ts
 */

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { setLanguage } from '../locales/set-language'
import availableLanguages from '../locales/available-languages.json'
import { monoRepoI18n } from './modules/i18n'

export const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * Handle NProgress display on page changes
 */
export const onBeforeEach: NavigationGuard = async () => {
  NProgress.start()
  const cookies = useCookies(['locale'])

  if (isSupportedLocale(cookies.get('locale'), availableLanguages))
    setLanguage(cookies.get('locale'), monoRepoI18n)
}

export const afterEach: NavigationHookAfter = async () => {
  NProgress.done(true)
}
router.beforeEach(onBeforeEach)
router.afterEach(afterEach)

export default router
