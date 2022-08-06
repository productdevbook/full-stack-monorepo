/* eslint-disable no-console */
import { LocalNotificationSchema, LocalNotifications } from '@capacitor/local-notifications'
// import { Badge } from '@capawesome/capacitor-badge'

export function useSendLocalNotification(datas: LocalNotificationSchema[]) {
  // const count = ref(0)

  const sendNotification = async () => {
    const notifs = await LocalNotifications.schedule({
      notifications: datas,
    })
    // await Badge.set({ count: count.value })
    // logs the notifcations
    console.log('scheduled notifications', notifs)
  }

  return {
    sendNotification,
  }
}
export default usePaymentModal
