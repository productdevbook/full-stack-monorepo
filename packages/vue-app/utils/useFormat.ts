import { format, toDate } from 'date-fns'
import type { I18n } from 'vue-i18n'
import { getDateFNSLocale } from './date/get-date-fns-locale'
import { localizedFormatDistance } from './date/localized-format-distance'
export enum DateFormats {
  toDate = 'D MMM yyyyy',
  toTime = 'HH:mm',
  toDateTime = 'D MMM yyyyy HH:mm',
  toTimeDate = 'HH:mm D MMM yyyyy',
}

export function useFormat() {
  const formatDate = (
    value: Date,
    fora: DateFormats = DateFormats.toTimeDate,
    customFormat?: 'HH:mm',
  ) => {
    return format(toDate(value), customFormat || fora)
  }
  const zoneFormat = async (
    value: Date | number,
    customFormat: string,
    i18n: I18n,
  ) => {
    return format(toDate(value), customFormat, {
      locale: await getDateFNSLocale(i18n),
    })
  }
  const fromNow = async (value: Date | number, i18n: I18n) => {
    return await localizedFormatDistance(i18n, toDate(value), new Date(), {
      addSuffix: true,
      includeSeconds: true,
    })
  }
  const unixNumber = (value: Date | number) => {
    return toDate(value)
  }
  const dateFormat = (value: Date | number) => {
    return toDate(value)
  }

  // const differenceInMilliseconds = (
  //   value: Date | number,
  //   baseDate: Date | number
  // ) => {
  //   return differenceInMilliseconds(toDate(value), toDate(baseDate))
  // }

  const formatDuration = (ms: number) =>
    new Date(ms).toISOString().substr(11, 8).replace(/^00:/, '')

  return {
    formatDate,
    fromNow,
    zoneFormat,
    unixNumber,
    dateFormat,
    formatDuration,
  }
}
