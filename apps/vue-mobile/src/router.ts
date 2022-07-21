import { createRouter, createWebHistory } from '@ionic/vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { NavigationGuard, NavigationHookAfter } from 'vue-router'

export const routes = [
  ...setupLayouts(generatedRoutes),
  { path: '/app', redirect: '/app/home' },
  { path: '/', redirect: '/auth/login' },
]

// export const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

let isLogin = false
export const onBeforeEach: NavigationGuard = async () => {
  const { fetchUser } = useAuth()
  const userStore = useUserStore()
  if (!isLogin) {
    isLogin = true
    fetchUser({
      onSuccess: (res) => {
        userStore.user = res
      },
    })
  }
}

export const afterEach: NavigationHookAfter = async () => {
  const ionContent = document.querySelector('ion-content')
  const scrollElement = ionContent && (await ionContent.getScrollElement())
  if (scrollElement)
    scrollElement.scrollTop = 0
}

router.beforeEach(onBeforeEach)
// router.afterEach(afterEach)
export default router
