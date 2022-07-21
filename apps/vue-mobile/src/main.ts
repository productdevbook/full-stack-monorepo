// import 'uno.css';
import { createApp } from 'vue'
import { Device } from '@capacitor/device'
import { IonicVue, isPlatform } from '@ionic/vue'
import { App as capApp } from '@capacitor/app'
import '@capacitor/core'

/* Theme variables */
import './theme/base.css'
import './theme/variables.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/ionic.bundle.css'
import axios from 'axios'
import { createPinia } from 'pinia'
import { AdMob } from '@capacitor-community/admob'
import { initIap } from './services/payment'
import { initCrisp, setDeviceInfo, setUserId, setVersion } from './services/crips'
import router, { routes } from './router'
import App from './App.vue'
import { initNotif } from './services/notifications'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).use(IonicVue)

async function init() {
  await AdMob.initialize({
    requestTrackingAuthorization: true,
    testingDevices: import.meta.env.DEV
      ? ['33BE2250B43518CCDA7DE426D04EE231']
      : undefined,
    initializeForTesting: import.meta.env.DEV,
  })
  try {
    if (isPlatform('ios'))
      initIap(import.meta.env.VITE_REVENU_IOS_ID)

    else if (isPlatform('android'))
      initIap(import.meta.env.VITE_REVENU_ANDROID_ID)

    initNotif()
    initCrisp()

    Object.values(import.meta.glob('./modules/*.ts', { eager: true })).map((i: any) =>
      i.install?.({ app, router, routes, pinia, axios }),
    )

    router.isReady().then(() => {
      app.mount('#app')
    })

    if (isPlatform('capacitor')) {
      const info = await Device.getId()
      const infoApp = await capApp.getInfo()
      const device = await Device.getInfo()
      // console.log('info', info)
      setUserId(info.uuid)
      setDeviceInfo(
        device.model,
        device.platform,
        device.operatingSystem,
        device.osVersion,
        infoApp.version,
        device.manufacturer,
      )
    }
    setVersion(import.meta.env.VITE_APP_VERSION)
    app.config.unwrapInjectedRef = true

    // await registerSW({ immediate: true })(true);
  }
  catch (e) {
    console.error(e)
  }
}
init()
