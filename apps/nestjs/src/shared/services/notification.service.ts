import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as firebase from 'firebase-admin'
import { Message, Notification } from 'firebase-admin/lib/messaging/messaging-api'
import { IConfig } from '@/config/interfaces/config.interface'

@Injectable()
export class NotificationService {
  constructor(configService: ConfigService<IConfig>) {
    if (configService.get('fcm_json')) {
      const firebaseCredentials = JSON.parse(configService.get('fcm_json').replace(/'/g, '"'))
      firebase.initializeApp({
        credential: firebase.credential.cert(firebaseCredentials),
      })
    }
  }

  async sendToDevice(title: string, data: Notification = { title: 'Title', body: 'body' }, token: string): Promise<Boolean> {
    // const tokens: string[] = users.map(user => user.fcm_token).filter(e => e) as string[]
    const message = {
      data,
      token,
      notification: data,
      apns: {
        payload: {
          aps: {
            badge: 1,
            sound: 'default',
          },
        },
      },
    } as Message
    try {
      await firebase.messaging().send(message).then(() => {
        return true
      })
      return true
    }
    catch (error) {
      /* eslint-disable no-console */
      console.log('Error sending message:', error)
      return false
    }
  }
}
