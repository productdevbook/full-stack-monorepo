import { isPlatform } from '@ionic/vue'
import { AppModule } from 'vue-app/types'

const intervalMS = 60 * 60 * 1000

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const install: AppModule = ({ router }) => {
  if (isPlatform('capacitor'))
    return
  router.isReady().then(async () => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({
      immediate: true,
      onRegisterError(error) {
        console.error('SW error', error)
      },
      onNeedRefresh() {},
      onOfflineReady() {},
      onRegistered(r) {
        r && setInterval(() => {
          r.update()
        }, intervalMS)
      },
    })
  })
}
