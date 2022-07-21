import { Transform } from 'class-transformer'
import { applyDecorators } from '@nestjs/common'
import { Property, PropertyOptions } from '@mikro-orm/core'
import { TimestampType } from '@/core/transformer/timestamp.transformer'

export const Timestamp = <T>(
  options?: PropertyOptions<T>,
) => {
  const transformer = Transform(({ value, type }) => {
    if (value) {
      return type === 1
        ? (value as Date).getTime()
        : type === 0
          ? new Date(value)
          : value
    }
  })
  if (!options)
    return applyDecorators(transformer)
  return applyDecorators(Property({ type: TimestampType }) as any, transformer)
}
