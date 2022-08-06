<script setup lang="ts">
import { LocalNotifications } from '@capacitor/local-notifications'
import { PushNotifications } from '@capacitor/push-notifications'
import { Badge } from '@capawesome/capacitor-badge'
import { initNotif } from '~/services/notifications'
const { t } = useI18n()
// const isLoading = ref(false)
const form = reactive({
  enableNotifications: false,
  legal: false,
  optForNewsletters: false,
})
const initNotifications = async () => {
  const isEnable = await LocalNotifications.checkPermissions()
  if (!isEnable)
    await LocalNotifications.requestPermissions()

  const isBadgeEnable = await Badge.checkPermissions()
  if (!isBadgeEnable)
    await Badge.requestPermissions()

  let isPushNotifications = await PushNotifications.checkPermissions()
  if (!isPushNotifications) {
    await PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register()
      }
      else {
      // Show some error
      }
    })
  }
  if (isPushNotifications.receive === 'prompt')
    isPushNotifications = await PushNotifications.requestPermissions()
}

const submit = async () => {
  if (isPlatform('capacitor') && form.enableNotifications)
    await initNotifications()
  initNotif()
}
</script>

<template>
  <IonPage>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <IonContent :fullscreen="true">
      <div class="mx-auto w-full lg:w-1/2">
        {{ form.enableNotifications }}
        <div class="py-16 px-6">
          <div class="my-2 flex items-center justify-between">
            <label for="notification" class="justify-self-start text-xl">{{
              t('activation.notification')
            }}</label>
            <IonToggle
              v-model="form.enableNotifications"
              color="success"
              @ion-change="submit"
            />
          </div>
          <p class="col-span-2 text-left">
            {{ t('activation.notification-desc') }}
          </p>
          <div class="mb-2 mt-4 flex items-center justify-between">
            <label for="notification" class="w-64 justify-self-start text-xl">{{
              t('activation.doi')
            }}</label>
            <IonToggle v-model="form.optForNewsletters" color="success" />
          </div>
          <p class="col-span-2 text-left">
            {{ t('activation.doi-desc') }}
          </p>
          <div class="mt-20">
            <NButton :block="true" type="success" @click="submit">
              {{ t('save') }}
            </NButton>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>

<!-- <route lang="yaml">
meta:
  option: tabs
</route> -->
