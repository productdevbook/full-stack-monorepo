import { defineStore } from 'pinia'
import { AdMob } from '@capacitor-community/admob'
import { getPurchaserInfo } from '~/services/payment'

export const useAppStore = defineStore({
  id: 'appStore',
  state: () => ({
    progressRouter: false,
    sidebarOpen: false,
    stutus: '' as 'writing' | 'reading' | 'null',
    fullScreen: false,
    hydrated: false,
    hydrating: false,
    error: null,
    authenticated: false,
    accessTokenExpiry: 0,
    appAccess: true,
    basemap: 'OpenStreetMap',
    isModalWindow: false,
    userLayoutSmall: false,
    isPro: false,
  }),
  getters: {
    getProgressRouter: state => state.progressRouter,
    isSidebar: state => state.sidebarOpen,
    getStatus: state => state.stutus,
    getIsPro: state => state.isPro,
  },
  actions: {
    async init() {
      const user = useUserStore()
      const { isPayment } = await getPurchaserInfo()
      if (isPayment) {
        this.isPro = true
        this.hideAd()
      }
      else {
        this.isPro = false
        if (user)
          this.showAd()

        else
          this.hideAd()
      }
    },
    changeAppAccess(value: boolean) {
      this.appAccess = value
    },
    changeSidebar(value?: boolean) {
      if (value === undefined)
        this.sidebarOpen = !this.sidebarOpen

      else
        this.sidebarOpen = value
    },
    changeIsModalWindow(value: boolean) {
      this.isModalWindow = value
    },
    changeUserLayoutSmall(value: boolean) {
      this.userLayoutSmall = value
    },
    async showAd() {
      await AdMob.resumeBanner()
    },
    async hideAd() {
      await AdMob.hideBanner()
    },
    changeIsPro(value: boolean) {
      this.isPro = value
    },
  },
})
