/* eslint-disable no-console */
import { getMessaging, getToken } from 'firebase/messaging'
import { initializeApp } from 'firebase/app'
import { CreateTokenNotificationDocument } from '@oku/api/node-graphql'
import { apolloClient } from '~/modules/apollo-graphql'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG

const registerToken = async (token: string) => {
  console.log(`Push registration success, token: ${token}`)
  const { errors } = await apolloClient.mutate({
    mutation: CreateTokenNotificationDocument,
    variables: {
      data: {
        token,
        deviceId: '',
      },
    },
  })
  if (errors)
    console.error('error registration', errors)
}
const app = initializeApp(JSON.parse(firebaseConfig as string))
export const messaging = getMessaging(app)
export const initNotif = () => {
  console.log('register web', firebaseConfig)
  getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY as string })
    .then(async (currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log('token', currentToken)
        try {
          await registerToken(currentToken)
        }
        catch (e) {
          console.error(e)
        }
      }
      else {
        // Show permission request UI
        console.log(
          'No registration token available. Request permission to generate one.',
        )
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err)
      // ...
    })
}
