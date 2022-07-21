/* eslint-disable no-console */
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import { isPlatform } from '@ionic/vue'
import type { ActionPerformed, PushNotificationSchema, Token } from '@capacitor/push-notifications'
import { PushNotifications } from '@capacitor/push-notifications'
import type { Router } from 'vue-router'
// import { Device } from '@capacitor/device'

// Your web app's Firebase configuration
const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG
// const firebaseConfigWeb = import.meta.env.VITE_WEB_FIREBASE_CONFIG

export const requestPerm = async () => {
  if (isPlatform('capacitor'))
    return PushNotifications.requestPermissions().then(perm => perm.receive)
  else
    return Notification.requestPermission()
}

const registerToken = async (token: string) => {
  console.log(token)
  // const api = useApollo()
  // const dev = await Device.getInfo()
  // const { error } = await api.mutate({
  //   mutation: CreateTokenNotificationDocument,
  //   variables: {

  //   },
  // })
  // if (error)
  //   console.error('error registration', error)
}

const checkPermissions = async () => {
  if (isPlatform('capacitor'))
    return PushNotifications.checkPermissions().then(perm => perm.receive)
  else
    return Notification.permission
}

const getTokenAny = async (): Promise<string> => {
  if (!isPlatform('capacitor')) {
    const app = initializeApp(JSON.parse(firebaseConfig as string))
    const messaging = getMessaging(app)
    return getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY as string })
  }
  else {
    return new Promise((resolve, reject) => {
      let unsubErr: any
      const unsub = PushNotifications.addListener('registration',
        (token: Token) => {
          resolve(token.value)
          unsub.remove()
          if (unsubErr)
            unsubErr.remove()
        },
      )
      unsubErr = PushNotifications.addListener('registrationError',
        (error: any) => {
          console.log(`Error on registration: ${JSON.stringify(error)}`)
          reject(error)
          if (unsubErr)
            unsubErr.remove()
          unsub.remove()
        },
      )
      PushNotifications.register()
    })
  }
}

export const unregisterToken = async () => {
  // const supabase = useSupabase()
  // try {
  //   const token = await getTokenAny()
  //   console.log(`Push unregistration success, token: ${token}`)
  //   const { error } = await supabase
  //     .from('notification_token')
  //     .delete()
  //     .match({ token })
  //   if (error)
  //     console.error('error unregistration', error)
  // }
  // catch (e) {
  //   console.error('unregisterToken', e)
  // }
}

export const initNotif = async (loop = true) => {
// Initialize Firebase
  const perm = await checkPermissions()
  if (perm === 'granted') {
    try {
      const token = await getTokenAny()
      await registerToken(token)
    }
    catch (e) {
      console.error('Cannot get or register token', e)
    }
  }
  else {
    console.log('No registration token available. Request permission to generate one.')
    const perm = await requestPerm()
    if (perm !== 'granted' && loop)
      initNotif(false)
  }
}

export const listenNotif = (router: Router) => {
  if (!isPlatform('capacitor')) {
    const app = initializeApp(JSON.parse(firebaseConfig as string))
    const messaging = getMessaging(app)
    const unsub = onMessage(messaging, (payload) => {
      console.log('Message received. ', payload)
      // ...
      const isNotInChatPages = window.location.pathname !== '/app/chats' && window.location.pathname.search('/chat/') === -1
      if (isNotInChatPages && payload.notification?.title) {
        const greeting = new Notification(payload.notification.title, {
          body: payload.notification?.body,
          icon: '/pwa-192x192.png',
        })

        greeting.addEventListener('click', () => {
          window.location.href = `${window.location.host}${payload.data?.link}`
        })
      }
    })
    return () => unsub()
  }
  else {
    // Show us the notification payload if the app is open on our device
    const unsub = PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log(`Push received: ${JSON.stringify(notification)}`)
      },
    )

    // Method called when tapping on a notification
    const unsub2 = PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log(`Push action performed: ${JSON.stringify(notification)}`)
        if (notification.notification.data.link)
          router.push(notification.notification.data.link)
      },
    )
    return () => { unsub.remove(); unsub2.remove() }
  }
}
