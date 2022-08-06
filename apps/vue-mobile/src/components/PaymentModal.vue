<script setup lang="ts">
import { SwiperOptions } from 'swiper'
import { Package, PurchaserInfo } from '@capgo/capacitor-purchases'
import { Dialog } from '@capacitor/dialog'

import {
  getCurrentOfferings,
  getPurchaserInfo,
  purchase,
  restore,
} from '~/services/payment'
defineProps({
  title: {
    type: String,
    default: 'Upgrade',
  },
})

const slideOpts = {
  initialSlide: 0,
  speed: 400,
  autoHeight: false,
  height: 100,
  loop: true,
  thumbs: true,
  autoplay: true,
} as SwiperOptions
const { showAd, hideAd } = useAppStore()

const data = ref<Package[]>()
const push = async () => {
  await getCurrentOfferings().then((res) => {
    if (res)
      data.value = res.availablePackages
  })
}
const isPayment = ref(false)
const isPurchasing = ref<PurchaserInfo>()
const { playConfetti } = useConfetti()

onMounted(async () => {
  await hideAd()
  await push()
  await getPurchaserInfo().then((res) => {
    if (res.data) {
      isPayment.value = res.isPayment
      isPurchasing.value = res.data
    }
  })
})
onBeforeUnmount(async () => {
  if (!isPayment.value)
    await showAd()
})

const modalClose = () => {
  modalController.dismiss()
}

const showConfirm = async () => {
  await Dialog.alert({
    title: 'Confirm account upgrade',
    message: 'Congratulations, your account has been upgraded.',
  }).then((res) => {
    modalClose()
  })
}
const { changeIsPro } = useAppStore()
async function purchasePackage(item: Package) {
  await purchase(item).then((res) => {
    useToast('Check payment status ...', {
      color: 'dark',
      position: 'top',
    })
    if (res) {
      playConfetti()
      showConfirm()
      changeIsPro(true)
    }
  })
}
</script>

<template>
  <IonPage ref="deneme">
    <IonHeader>
      <IonToolbar>
        <IonTitle>{{ title }}</IonTitle>
        <IonButtons slot="primary">
          <IonButton @click="modalClose()">
            Close
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <ion-slides :pager="true" :options="slideOpts">
        <ion-slide>
          <div class="flex w-full flex-col bg-gray-100 p-4 dark:bg-dark-200">
            <p>Feature 1</p>
            <p>Slide 1</p>
            <p>Slide 1</p>
            <p>Slide 1</p>
          </div>
        </ion-slide>
        <ion-slide>
          <div class="flex w-full flex-col bg-gray-100 p-4 dark:bg-dark-200">
            <p>Feature 1</p>
            <p>Slide 1</p>
            <p>Slide 1</p>
            <p>Slide 1</p>
          </div>
        </ion-slide>
      </ion-slides>
      <div class="grid grid-cols-1 gap-6 p-4">
        <div v-for="item in data" :key="item.identifier">
          <div
            class="flex h-20 justify-between rounded-lg bg-gray-200 p-4 shadow dark:bg-zinc-800"
            @click="purchasePackage(item)"
          >
            <div class="flex flex-col">
              <p>
                {{ item.product.title }}
              </p>

              <span class="text-xs">{{ item.product.description }}</span>
            </div>
            <p class="text-lg font-bold">
              {{ item.product.price }}
              <span>{{ item.product.currencyCode }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="isPayment && isPurchasing">
        Paymentsss
        {{ isPurchasing.activeSubscriptions }}
      </div>
      <IonButton @click="restore()">
        Restore
      </IonButton>
    </IonContent>
  </IonPage>
</template>
