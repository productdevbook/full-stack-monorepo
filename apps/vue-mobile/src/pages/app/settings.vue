<script setup lang="ts">
import { darkThemeProvide } from '~/general'
const { result, loading } = useGetUserInfoQuery()
const theme = inject(darkThemeProvide)
const { t } = useI18n()
const { isPaymentModal } = usePaymentModal()
const { logout } = useAuth()
const router = useRouter()

const logoutLoading = ref(false)

const logoutButton = () => {
  logout(null, {
    onLoading: (res) => {
      logoutLoading.value = res
    },
    onSuccess: (res) => {
      useToast('Logged out', { color: 'success' })
      router.push(res)
    },
    onError: (res) => {
      useToast(res.error, { color: 'warning' })
    },
  })
}
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="light" :fullscreen="true">
      <IonItemGroup class="border-horz">
        <IonItem lines="none">
          {{ loading }}
          <div v-if="result && !loading">
            {{ result.me.email }}
          </div>
        </IonItem>
      </IonItemGroup>
      <IonItemDivider color="light">
        <IonLabel>App Settings</IonLabel>
        <!-- <ion-spinner *ngIf="isloading" color="tertiary" name="lines-small"></ion-spinner> -->
      </IonItemDivider>

      <IonItemGroup class="border-horz">
        <IonItem lines="none">
          <IonItem lines="none">
            <div
              :class="
                !theme?.isDark
                  ? 'i-ph-moon-stars-duotone '
                  : 'i-ph-sun-dim-duotone text-white'
              "
            />
          </IonItem>
          <IonLabel>Dark</IonLabel>
          <IonToggle
            value="pepperoni"
            :checked="!theme?.isDark"
            @ion-change="theme?.updateDarkTheme()"
          />
        </IonItem>
      </IonItemGroup>
      <IonItemGroup style="margin-top: 35px !important" class="border-horz">
        <IonItem lines="full">
          <IonLabel>Ask to Join Networks</IonLabel>
        </IonItem>
      </IonItemGroup>
      <li>
        <button @click="router.push('/app/notification_settings')">
          <span class="font-bold">
            {{ t('account.preferences') }}
          </span>
        </button>
      </li>

      <div class="item-under-text">
        Known networks will be joined automatically. If no known networks are
        available, you will have to manually select a network.
      </div>

      <div class="item-under-text">
        Known networks will be joined automatically. If no known networks are
        available, you will be asked before joining a new network.
      </div>

      <div class="item-under-text">
        AirDrop, AirPlay, and location services require Wi-Fi.
      </div>
      <IonButton @click="isPaymentModal()">
        Show Modal
      </IonButton>
      <AtomButton :loading="logoutLoading" @click="logoutButton()">
        Logout
      </AtomButton>
    </IonContent>
  </IonPage>
</template>

<route lang="yaml">
meta:
  option: tabs
</route>
