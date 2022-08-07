import type { Composer } from 'vue-i18n'

export async function setLanguage(lang: any, i18n: any): Promise<boolean> {
  if (i18n.mode === 'legacy')
    i18n.global.locale.value = lang

  else
    (i18n.global as unknown as Composer).locale.value = lang

  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */

  const html = document.querySelector<HTMLElement>('html')
  html?.setAttribute('lang', lang)
  return true
}
