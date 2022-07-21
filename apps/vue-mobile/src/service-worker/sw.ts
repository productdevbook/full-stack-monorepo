/// <reference lib="webworker" />
import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG

precacheAndRoute(self.__WB_MANIFEST || [])

registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/index.html'),
)

// https://firebase.google.com/docs/cloud-messaging/js/receive#handle_messages_when_your_web_app_is_in_the_background
const firebaseApp = initializeApp(JSON.parse(firebaseConfig as string))

const messaging = getMessaging(firebaseApp)
onBackgroundMessage(messaging, (payload) => {
  console.log('onBackgroundMessage', payload)

  return self.registration.showNotification(payload.notification?.title || 'no title', {
    body: payload.notification?.body,
    data: payload.data,
  })
})

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())

// Todo: Check below code. Some problem with it. Its not being called on background-notification click
// eslint-disable-next-line prefer-arrow-callback
self.addEventListener('notificationclick', function (event) {
  // console.log('notificationclick event', event)
  console.log('notificationclick notif', event.notification)
  const data = event.notification.data
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(self.clients.matchAll({
    type: 'window',
  }).then((clientList) => {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i]
      if (client.url === '/' && 'focus' in client) {
        client.focus()
        if (data.link)
          client.navigate(data.link)
      }
    }
    if (self.clients.openWindow) {
      if (data.link)
        self.clients.openWindow(data.link)
      else
        self.clients.openWindow('/')
    }
  }))
})
