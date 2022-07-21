<script setup lang="ts">
import { useMessage, useNotification } from 'naive-ui'
import { listenNotif } from '~/services/notifications'

const router = useRouter()
const isTab = computed(() => {
  return (
    router.currentRoute.value.meta.option
      && router.currentRoute.value.meta.option === 'tabs'
  )
})

onMounted(async () => {
  listenNotif(router)
  window.$message = useMessage()
  window.$notication = useNotification()
})
</script>

<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet />
      <IonTabBar
        v-if="isTab"
        slot="bottom"
        class="border-t dark:border-[color:var(--ion-color-step-100)]"
      >
        <IonTabButton tab="home" href="/app/home">
          <UnoIcon class="i-ph-hexagon-duotone text-xl" />
        </IonTabButton>

        <IonTabButton tab="notifications" href="/app/notifications">
          <UnoIcon class="i-ph-bell-duotone text-xl" />

          <IonBadge>6</IonBadge>
        </IonTabButton>

        <IonTabButton tab="settings" href="/app/settings">
          <UnoIcon class="i-ph-android-logo-duotone text-xl" />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<style lang="postcss">
  .md ion-toolbar {
    --ion-background-color: var(--ion-color-primary);
  }
  .md ion-toolbar ion-title {
    --color: var(--ion-color-primary-contrast);
  }
  .md ion-toolbar ion-buttons ion-button {
    --color: var(--ion-color-primary-contrast) !important;
  }
  .ios ion-toolbar ion-buttons ion-button {
    --color: var(--ion-color-medium) !important;
  }
  .md ion-toolbar ion-buttons ion-back-button {
    --color: var(--ion-color-primary-contrast) !important;
  }
</style>
