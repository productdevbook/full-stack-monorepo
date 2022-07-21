import { Type } from '@mikro-orm/core'

export class TimestampType extends Type<Date | undefined, number | undefined> {
  convertToDatabaseValue(value: Date | undefined): number | undefined {
    if (!value)
      return value
    return value.getTime()
  }

  convertToJSValue(value: number | undefined): Date | undefined {
    if (value == null)
      return value
    return new Date(+value)
  }

  getColumnType() {
    return 'bigint'
  }
}
