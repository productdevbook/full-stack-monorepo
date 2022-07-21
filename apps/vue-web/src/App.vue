<script setup lang="ts">
import { GlobalThemeOverrides, darkTheme, lightTheme, useMessage } from 'naive-ui'
const { locale } = useI18n()
// auto-detect dark theme support
const prefersDark = usePreferredDark()
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components
const icon = computed(() => {
  return prefersDark.value ? '/logo-dark.png' : '/logo-light.png'
})
useHead({
  title: 'Product Dev Book',
  meta: [
    {
      property: 'og:locale:alternate',
      content: locale.value,
      key: locale.value,
    },
  ],
  link: [{ rel: 'icon', type: 'image/x-icon', href: icon }],
})
const isDark = useDark()
const colorSchema = useStorage('vueuse-color-scheme', 'auto')

const themeLight: GlobalThemeOverrides = {
  common: {
    fontFamily:
        'Inter var, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono: ' "Fira Mono", monospace, sans-serif',
    primaryColor: '#267866',
    scrollbarWidth: '10px',
    borderRadius: '4px',
    bodyColor: '#fff',
  },
  Card: {
    color: '#fff',
  },
  Input: {
    heightMedium: '2.5rem',
    border: '2px solid #e2e8f0',
    borderHover: '2px solid #cbd5e1',
    borderFocus: '2px solid #16a34a',
    borderError: '2px solid #dc2626',
    borderHoverError: '2px solid #f87171',
    borderFocusError: '2px solid #dc2626',
  },
  Tabs: {
    colorSegment: '#E9ECEF',
  },
  Carousel: {
    dotColorActive: '#222',
    dotColor: '#777',
    dotSize: '10px',
    arrowColor: '#222',
    dotColorFocus: '#444',
  },
  Menu: {
    itemHeight: '32px',
    fontSize: '13px',
    borderRadius: '4px',
    itemColorActive: '#E9ECEF',
    itemTextColorActive: '#267866',
    itemTextColorHover: '#267866',
    itemIconColor: '#6C757D',
    itemTextColor: '#6C757D',
    itemTextColorChildActive: '#267866',
    arrowColorChildActive: '#267866',
    itemIconColorChildActive: '#267866',
    itemIconColorHover: '#267866',
    itemIconColorActive: '#267866',
  },
}

const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    fontFamily:
        'Inter var, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFamilyMono: ' "Fira Mono", monospace, sans-serif',
    primaryColor: '#267866',
    scrollbarWidth: '8px',
    bodyColor: '#222',
    textColor1: '#fff',
    textColor2: '#fff',
  },
  Card: {
    color: '#222',
  },
  Button: {
    textColorSuccess: '#fff',
  },
  Tabs: {
    colorSegment: '#333',
  },
  Input: {
    color: '#222',
    heightMedium: '2.5rem',
    border: '2px solid #444',
    borderHover: '2px solid #666',
    borderFocus: '2px solid #16a34a',
    borderError: '2px solid #dc2626',
    borderHoverError: '2px solid #f87171',
    borderFocusError: '2px solid #dc2626',
  },
  Menu: {
    itemHeight: '32px',
    fontSize: '13px',
    borderRadius: '4px',
    itemColorActive: '#333',
    itemTextColorActive: '#aaa',
    itemTextColorHover: '#aaa',
    itemIconColor: '#888',
    itemTextColor: '#888',
    itemTextColorChildActive: '#aaa',
    arrowColorChildActive: '#aaa',
    itemIconColorChildActive: '#aaa',
    itemIconColorHover: '#aaa',
    itemIconColorActive: '#aaa',
  },
}

const handleThemeSelect = (key: 'auto' | 'dark' | 'light') => {
  if (key === 'auto') {
    colorSchema.value = 'auto'
  }
  else {
    colorSchema.value = key
    isDark.value = key === 'dark'
  }
}
const availableColor = ref([
  {
    key: 'auto',
    label: 'system',
    icon: useRenderIcon('i-ph-laptop-duotone'),
  },
  {
    key: 'dark',
    label: 'dark',
    icon: useRenderIcon('i-ph-moon-stars-duotone'),
  },
  {
    key: 'light',
    label: 'light',
    icon: useRenderIcon('i-ph-sun-dim-duotone'),
  },
])
</script>

<template>
  <div id="webapp">
    <NConfigProvider
      :theme="isDark ? darkTheme : lightTheme"
      :theme-overrides="isDark ? darkThemeOverrides : themeLight"
    >
      <NGlobalStyle />
      <NMessageProvider>
        <NNotificationProvider>
          <div class="absolute top-0 left-0 z-50">
            <NDropdown
              trigger="click"
              :options="availableColor"
              @select="handleThemeSelect"
            >
              <NButton style="--height: 90%">
                <template v-if="colorSchema === 'auto'" #icon>
                  <div class="i-ph-laptop-duotone" />
                </template>
                <template v-else-if="colorSchema === 'light'" #icon>
                  <div class="i-ph-sun-dim-duotone" />
                </template>
                <template v-else-if="colorSchema === 'dark'" #icon>
                  <div class="i-ph-moon-stars-duotone" />
                </template>
              </NButton>
            </NDropdown>
          </div>
          <router-view />
        </NNotificationProvider>
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>
