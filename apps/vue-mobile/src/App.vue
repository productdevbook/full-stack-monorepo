<script setup lang="ts">
import { GlobalThemeOverrides, darkTheme, lightTheme } from 'naive-ui'
import { darkThemeProvide } from './general'
const isDark = useDark()
function updateDarkTheme() {
  isDark.value = !isDark.value
}
provide(darkThemeProvide, {
  isDark: isDark.value,
  updateDarkTheme,
})
const themeOverrides: GlobalThemeOverrides = {
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
    borderRadius: '6px',
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
    primaryColor: '#047857',
    successColor: '#047857',
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
</script>

<template>
  <div id="app">
    <IonApp>
      <NConfigProvider
        :theme="isDark ? darkTheme : lightTheme"
        :theme-overrides="isDark ? darkThemeOverrides : themeOverrides"
      >
        <NGlobalStyle />
        <NMessageProvider>
          <NNotificationProvider>
            <IonRouterOutlet />
          </NNotificationProvider>
        </NMessageProvider>
      </NConfigProvider>
    </IonApp>
  </div>
  <div id="dialog-window" />
  <div id="dialog-outlet" />
</template>
