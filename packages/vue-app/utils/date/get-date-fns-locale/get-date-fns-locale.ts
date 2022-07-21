import { Locale } from 'date-fns'
import type { I18n } from 'vue-i18n'

export async function getDateFNSLocale(i18n: I18n): Promise<Locale> {
  const lang = i18n.global.locale as string
  let dateLocale = undefined as Locale | undefined
  let langCode
  if (lang.includes('-')) {
    langCode = lang
      .split('-', 2)
      .map((value, index) => (index > 0 ? value.toUpperCase() : value))
      .join('-')
  }
  dateLocale = (
    await import(/* @vite-ignore */ `date-fns/locale/${langCode}/index.js`)
  ).default
  return dateLocale as Locale
}
