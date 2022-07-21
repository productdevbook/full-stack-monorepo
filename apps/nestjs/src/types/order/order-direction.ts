import { registerEnumType } from '@nestjs/graphql'

export enum OrderDirection {
  // Specifies an ascending order for a given `orderBy` argument.
  asc = 'ASC',
  // Specifies a descending order for a given `orderBy` argument.
  desc = 'DESC',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.',
})
