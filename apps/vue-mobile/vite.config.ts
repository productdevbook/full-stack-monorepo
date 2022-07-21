import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import EnvironmentPlugin from 'vite-plugin-environment'
import Unocss from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'
import { VitePWA } from 'vite-plugin-pwa'

import {
  HeadlessUiResolver,
  NaiveUiResolver,
} from 'unplugin-vue-components/resolvers'

import pack from './package.json'
const domain = 'com.productdevbook.test'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  define: {
    'process.env.REVENU_IOS_ID': JSON.stringify(process.env.REVENU_IOS_ID),
    'process.env.REVENU_ANDROID_ID': JSON.stringify(
      process.env.REVENU_ANDROID_ID,
    ),
    'process.env.CRISP_KEY': JSON.stringify(process.env.CRISP_KEY),
  },
  plugins: [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({ extensions: ['vue'] }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        'vee-validate',
        'pinia',
        {
          '@ionic/vue': [
            'useBackButton',
            'useKeyboard',
            'createAnimation',
            'createGesture',
            'iosTransitionAnimation',
            'mdTransitionAnimation',
            'getPlatforms',
            'isPlatform',
            'menuController',
            'getTimeGivenProgression',
            'onIonViewWillEnter',
            'onIonViewDidEnter',
            'onIonViewWillLeave',
            'onIonViewDidLeave',
            'useIonRouter',
            'modalController',
            'popoverController',
            'alertController',
            'actionSheetController',
            'loadingController',
            'pickerController',
            'toastController',
          ],
        },
      ],
      resolvers: [NaiveUiResolver()],
      dirs: [
        './src/composables/',
        '../../packages/vue-app/composables/',
        './src/stores/',
        '../../packages/oku-api/types/',
      ],
      dts: './src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [
        '../../packages/vue-design-system/components/',
        './src/components/',
      ],
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [
        /[\\/]node_modules[\\/]/,
        /[\\/]\.git[\\/]/,
        /[\\/]\.nuxt[\\/]/,
      ],
      directoryAsNamespace: true,

      // custom resolvers
      resolvers: [
        HeadlessUiResolver(),
        NaiveUiResolver(),
        (ionic) => {
          if (ionic.startsWith('Ion'))
            return { name: `Ion${ionic.slice(3)}`, from: '@ionic/vue' }
        },
      ],
      dts: 'src/components.d.ts',
    }),

    Unocss({
      mode: 'vue-scoped',
      presets: [
        presetIcons({
          scale: 1.2,
          extraProperties: {
            display: 'inline-block',
          },
          prefix: 'i-',
        }),
        // ...other presets
      ],
      safelist: ['i-ph-activity-duotone'],
    }),

    EnvironmentPlugin(
      {
        VITE_APP_VERSION: pack.version,
        package_dependencies: JSON.stringify(pack.dependencies),
        domain,
      },
      { defineOn: 'import.meta.env', loadEnvFiles: true },
    ),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      base: '/',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'safari-pinned-tab.svg'],
      srcDir: 'src/service-worker',
      filename: 'sw.ts',
      strategies: 'injectManifest',
      injectRegister: null,
      workbox: {
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Productdevbook',
        short_name: '9M',
        theme_color: '#faa29e',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, '../../packages/oku-i18n/src/locales/**')],
    }),
  ],
  server: {
    fs: {
      strict: true,
    },
  },
})
