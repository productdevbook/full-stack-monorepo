<script setup lang="ts">
import { PushNotifications } from '@capacitor/push-notifications'
const form = reactive({
  enableNotifications: false,
  legal: false,
  optForNewsletters: false,
})

const isLoading = ref(false)

const { t } = useI18n()

const submit = async () => {
  isLoading.value = true
  if (isPlatform('capacitor') && form.enableNotifications)
    await PushNotifications.requestPermissions()

  // const { error } = await supabase.auth.update({
  //     data: {
  //         activation: {
  //             formFilled: true,
  //             enableNotifications: form.enableNotifications,
  //             legal: form.legal,
  //             optForNewsletters: form.optForNewsletters,
  //         },
  //     },
  // });
  // isLoading.value = false;
  // if (error) errorMessage.value = error.message;
  // else router.push('/app/home');
}
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <form class="mx-auto grid w-full p-8 lg:w-1/2" @submit.prevent="submit">
        <!-- <TitleHead :big="true" :title="t('activation.heading')" /> -->
        <p
          class="text-pumpkin-orange-500 mt-12 mb-6 text-left text-lg font-medium leading-snug"
        >
          {{ t('activation.desc') }}
        </p>
        <div class="mx-auto mt-6 mb-8 w-full">
          <div class="mb-2 flex items-center justify-between">
            <label
              for="notification"
              class="justify-self-start text-lg font-medium"
            >{{ t('activation.notification') }}</label>
            <IonToggle
              v-model="form.enableNotifications"
              :disabled="isLoading"
              color="success"
            />
          </div>
          <p class="col-span-2 text-left text-sm text-grey">
            {{ t('activation.notification-desc') }}
          </p>
          <div class="mb-2 mt-6 flex items-center justify-between">
            <label for="legal" class="justify-self-start text-lg font-medium">{{
              t('activation.legal')
            }}</label>
            <IonToggle
              v-model="form.legal"
              :disabled="isLoading"
              color="success"
            />
          </div>
          <p class="col-span-2 text-left text-sm text-grey">
            {{ t('activation.legal-desc') }}
          </p>
          <div class="mb-2 mt-6 flex items-center justify-between">
            <label for="doi" class="justify-self-start text-lg font-medium">{{
              t('activation.doi')
            }}</label>
            <IonToggle
              v-model="form.optForNewsletters"
              :disabled="isLoading"
              color="success"
            />
          </div>
          <p class="col-span-2 text-left text-sm text-grey">
            {{ t('activation.doi-desc') }}
          </p>
        </div>
        <IonButton
          :disabled="isLoading || !form.legal"
          type="submit"
          color="secondary"
          shape="round"
          class="mx-auto w-1/2 text-center uppercase text-white"
        >
          <span v-if="!isLoading">
            {{ t('activation.validate') }}
          </span>
          <IonSpinner v-else name="crescent" color="light" />
        </IonButton>
      </form>
    </IonContent>
  </IonPage>
</template>
