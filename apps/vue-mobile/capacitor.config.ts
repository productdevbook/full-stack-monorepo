/// <reference types="@capacitor/push-notifications" />
/// <reference types="@robingenz/capacitor-badge" />


import {CapacitorConfig} from '@capacitor/cli'
import getIPAdress from './utils/get-ip-address'
const ip = getIPAdress()
const serverConfig = {
  url: process.env.VITE_GRAPHQL_URL || `http://${ip}:5000`,
  cleartext: true,
} as CapacitorConfig['server']

const config: CapacitorConfig = {
  appId: 'com.productdevbook.test',
  appName: 'Product Dev Book',
  webDir: 'dist',
  bundledWebRuntime: false,
  // Uncomment this to enable live-reload.
  // For Android, need to run `adb reverse tcp:4000 tcp:4000` to port-forward the Frontend server to the emulator.
  //
  server: serverConfig,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchAutoHide: false,
      androidScaleType: 'CENTER_CROP',
    },
    Badge: {
      persist: true,
      autoClear: false
    }
  },
}

export default config
