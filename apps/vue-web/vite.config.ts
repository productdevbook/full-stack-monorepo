import { resolve } from 'path'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'
import {
  HeadlessUiResolver,
  NaiveUiResolver,
} from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
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
      resolvers: [HeadlessUiResolver(), NaiveUiResolver()],

      dts: 'src/components.d.ts',
    }),

    Unocss({
      presets: [
        presetIcons({
          scale: 1.2,
          extraProperties: {
            display: 'inline-block',
          },
          prefix: 'i-',
        }),
      ],
      safelist: [
        'i-ph-laptop-duotone',
        'i-ph-moon-stars-duotone',
        'i-ph-sun-dim-duotone',
      ],
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'safari-pinned-tab.svg',
      ],
      injectRegister: 'auto',
      manifest: {
        name: 'productdevbook',
        short_name: 'productdevbook',
        theme_color: '#267866',
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
      },
    }),
  ],
})
