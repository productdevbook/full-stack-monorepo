export { languages } from './languages'

export { useFormat, DateFormats } from './useFormat'

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const checkRegex = (regex: RegExp, value: string) => {
  const isValid = regex.test(value)
  return isValid
}

export enum GlobalVar {
  SCALE_NUMBER = 1.13,
  SCALE_NUMBER_SMALL = 0.95,
  SCALE_NUMBER_XS = 0.6,
  DURACTION_1S = 0.1,
  DURACTION_2S = 0.2,
  DURACTION_3S = 0.3,
  DURACTION_4S = 0.4,
  DURACTION_5S = 0.5,
  DURACTION_DOWN_MOBILE = 0.8,
}

export function supportLocales(langugues: any) {
  return Object.entries(langugues).map(([key, value]) => ({
    label: value,
    value: key,
  }))
}

export function isSupportedLocale(locale: string, languages: any) {
  return supportLocales(languages).some(({ value }) => value === locale)
}

export type SelectedTheme = 'auto' | 'light' | 'dark'
