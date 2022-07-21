import { format } from 'date-fns'
import type { I18n } from 'vue-i18n'
import { getDateFNSLocale } from '../../../utils/date/get-date-fns-locale'
type localizedFormatType = (
  i18n: I18n,
  ...a: Parameters<typeof format>
) => Promise<string>

export const localizedFormat: localizedFormatType = async (
  i18n: I18n,
  date,
  formatType,
  options,
): Promise<string> => {
  return format(date, formatType, {
    ...options,
    locale: await getDateFNSLocale(i18n),
  })
}
