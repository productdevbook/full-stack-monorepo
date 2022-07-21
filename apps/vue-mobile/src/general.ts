import { InjectionKey } from 'vue'

// eslint-disable-next-line symbol-description
export const darkThemeProvide = Symbol() as InjectionKey<{
  isDark: boolean
  updateDarkTheme: () => void
}>
