import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import 'uno.css'
import './assets/base.css'
import { createHead } from '@vueuse/head'
// import { onMessage } from 'firebase/messaging'
import router, { routes } from './router'
// import { messaging } from './services/notifications'
import App from './App.vue'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
const head = createHead()

const pinia = createPinia()
const app = createApp(App).use(router).use(pinia).use(head)
async function init() {
  try {
    Object.values(import.meta.glob('./modules/*.ts', { eager: true })).map((i: any) =>
      i.install?.({ app, router, routes, pinia, axios }),
    )

    router.isReady().then(() => {
      app.mount('#app')
    })
    app.config.unwrapInjectedRef = true

    // await registerSW({ immediate: true })(true);
  }
  catch (e) {
    console.error(e)
  }
  finally {
    // eslint-disable-next-line no-console
    console.log('init')
  }
}
if (import.meta.hot)
  import.meta.hot.accept()

init()
// TODO nullable Firebase messaging
// if (import.meta.env.VITE_FIREBASE_CONFIG) {
//   onMessage(messaging, (payload) => {
//     if (payload.notification === undefined)
//       return

//     // console.log(payload.data)
//     const notificationData = payload

//     // eslint-disable-next-line no-console
//     console.log(
//       '[firebase-messaging-sw.js] Received foreground message ',
//       notificationData,
//     )
//     const { tSuccess } = usePWebNotification()
//     if (notificationData.data)
//       tSuccess({ title: notificationData.data.title, description: notificationData.data.body })

//     const { title, body } = notificationData.data as { title: string; body: string }
//     const notificationTitle = title
//     const notificationOptions = {
//       body,
//       icon: '/logo-dark.png',
//     }

//     navigator.serviceWorker.ready.then((registration) => {
//       registration
//         .showNotification(notificationTitle, notificationOptions)
//         .then(() => {
//           // eslint-disable-next-line no-console
//           console.log('[firebase-messaging-sw.js] Notification shown')
//         })
//         .catch((error) => {
//           console.error(
//             '[firebase-messaging-sw.js] Error showing notification',
//             error,
//           )
//         })
//     })
//   })
// }
