<script setup lang="ts">
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCookies } from '@vueuse/integrations/useCookies'
import { languages } from 'vue-app/utils'
import { useMessage, useNotification } from 'naive-ui'
import availableLanguages from '../../locales/available-languages.json'

import { setLanguage } from '../../locales/set-language'
// import {useUserStore} from '~/stores'
import { monoRepoI18n } from '~/modules/i18n'

const { t } = useI18n()
// const {theme} = useUserStore()
const isDark = inject('isDark')
const languagesData = languages(availableLanguages)
const isLanguageViewOpen = ref(false)
const cookies = useCookies(['locale'])

const changeLanguage = (lang: string) => {
  setLanguage(lang, monoRepoI18n)
  localStorage.setItem('lang', lang)
  cookies.set('locale', lang)
}
onMounted(() => {
  window.$message = useMessage()
  window.$notication = useNotification()
})
</script>

<template>
  <div class="flex-1-0 flex h-screen flex-col overflow-auto">
    <div class="flex-1-0 flex h-screen flex-col justify-between">
      <NScrollbar>
        <router-view />
      </NScrollbar>
      <div class="absolute bottom-3 left-5 space-y-4">
        <div>
          <button
            :class="
              isDark
                ? 'bg-su-900 hover:bg-su-200 dark:hover:bg-su-800 dark:hover:text-su-50'
                : 'bg-gunes-600 text-gunes-50 hover:bg-gunes-500 hover:text-gunes-900'
            "
            class="flex items-center rounded-md py-2 px-4 text-sm shadow-lg"
            role="menuitem"
            tabindex="-1"
          >
            <AtomHIcon
              :style="{
                '--h-icon-color': isDark ? '#0f94bf' : '#fdfbf3',
              }"
              :name="isDark ? 'i-ph-moon-duotone' : 'i-ph-sun-duotone'"
            />
          </button>
        </div>
        <div>
          <button
            class="flex items-center rounded-md bg-dark-300 py-2 px-4 text-sm text-white shadow-lg"
            role="menuitem"
            tabindex="-1"
            @click="isLanguageViewOpen = !isLanguageViewOpen"
          >
            <AtomHIcon name="i-ph-translate-bold" />
          </button>
        </div>
      </div>
      <AtomHDialogBg
        v-model="isLanguageViewOpen"
        placement="center-bottom"
        @esc="isLanguageViewOpen = false"
      >
        <div
          class="max-h-(100vh-200px) inline-block w-full overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-dark-100 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
        >
          <div class="relative h-32 overflow-hidden">
            <img
              class="h-32 w-full object-cover"
              src="https://images.unsplash.com/photo-1550895030-823330fc2551?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&h=128&q=100"
              alt=""
            >
          </div>
          <div class="space-y-4 p-4">
            <div class="text-lg font-bold">
              {{ t('language.change') }}
            </div>
            <div class="grid grid-cols-3 gap-6">
              <button
                v-for="language in languagesData"
                :key="language.value"
                :class="
                  cookies.get('locale') === language.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-200'
                "
                class="h-14 rounded p-2 font-medium"
                @click="changeLanguage(language.value)"
              >
                <span> {{ language.value }}</span>
              </button>
            </div>
          </div>
          <div
            class="mt-5 grid grid-flow-row-dense grid-cols-1 gap-3 p-4 sm:mt-6 sm:grid-flow-row-dense sm:grid-cols-3 [&>*]:rounded-lg [&>*]:p-3"
          >
            <button
              class="col-span-1 bg-gray-200 sm:col-span-1"
              secondary
              full
              size="base"
              @click="isLanguageViewOpen = false"
            >
              {{ t('global.cancel') }}
            </button>
            <button
              class="col-span-1 bg-green-600 text-white sm:col-span-2"
              size="base"
              full
              kind="success"
              @click="isLanguageViewOpen = false"
            >
              {{ t('global.save') }}
            </button>
          </div>
        </div>
      </AtomHDialogBg>
    </div>
  </div>
</template>
