import formatDistanceOriginal from 'date-fns/formatDistance'
import type { I18n } from 'vue-i18n'
import { getDateFNSLocale } from '../../date/get-date-fns-locale'
type LocalizedFormatDistance = (
  i18n: I18n,
  ...a: Parameters<typeof formatDistanceOriginal>
) => Promise<string>

export const localizedFormatDistance: LocalizedFormatDistance = async (
  i18n: I18n,
  date,
  baseDate,
  options,
): Promise<string> => {
  return formatDistanceOriginal(date, baseDate, {
    ...options,
    locale: await getDateFNSLocale(i18n),
  })
}
