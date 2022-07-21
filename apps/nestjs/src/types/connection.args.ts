import {
  ConnectionArguments,
  ConnectionCursor,
  fromGlobalId,
} from 'graphql-relay'
import { ArgsType, Field } from '@nestjs/graphql'
import { OrderDirection } from './order/order-direction'

type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' }

function checkPagingSanity(args: ConnectionArgs): PagingMeta {
  const { first = 0, last = 0, after, before } = args

  const isForwardPaging = !!first || !!after
  const isBackwardPaging = !!last || !!before
  if (isForwardPaging && isBackwardPaging)
    throw new Error('Relay pagination cannot be forwards AND backwards!')

  if ((isForwardPaging && before) || (isBackwardPaging && after))
    throw new Error('Paging must use either first/after or last/before!')

  if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0))
    throw new Error('Paging limit must be positive!')

  if (last && !before)
    throw new Error('When paging backwards, a \'before\' argument is required!')

  return isForwardPaging
    ? { pagingType: 'forward', after, first }
    : isBackwardPaging
      ? { pagingType: 'backward', before, last }
      : { pagingType: 'none' }
}

const getId = (cursor: ConnectionCursor) =>
  parseInt(fromGlobalId(cursor).id, 10)
const nextId = (cursor: ConnectionCursor) => getId(cursor) + 1
export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
function getOrderParameters(args: ConnectionArgs) {
  let field: string
  let sort: SortEnum
  if (args.orderField != null || args.orderField !== undefined)
    field = args.orderField

  else
    field = 'id'

  if (args.orderSort === 'ASC')
    sort = SortEnum.ASC

  else if (args.orderSort === 'DESC')
    sort = SortEnum.DESC

  else
    sort = SortEnum.ASC

  return { field, sort }
}

function getPagingParameters(args: ConnectionArgs) {
  const meta = checkPagingSanity(args)

  switch (meta.pagingType) {
    case 'forward': {
      return {
        limit: meta.first,
        offset: meta.after ? nextId(meta.after) : 0,
      }
    }
    case 'backward': {
      const { before } = meta
      let { last } = meta
      let offset = getId(before ?? '') - last

      if (offset < 0) {
        last = Math.max(last + offset, 0)
        offset = 0
      }

      return { offset, last }
    }
    default:
      return {}
  }
}
@ArgsType()
export default class ConnectionArgs implements ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description: 'Paginate before opaque cursor',
  })
  public before?: ConnectionCursor

  @Field(() => String, {
    nullable: true,
    description: 'Paginate after opaque cursor',
  })
  public after?: ConnectionCursor

  @Field(() => Number, { nullable: true, description: 'Paginate fist' })
  public first?: number

  @Field(() => Number, { nullable: true, description: 'Paginate last' })
  public last?: number

  @Field(() => String, { nullable: true, description: 'Orderby field' })
  public orderField?: string

  @Field(() => OrderDirection, {
    nullable: true,
    description: 'Orderby sort',
  })
  public orderSort?: OrderDirection | null

  pagingParams() {
    return getPagingParameters(this)
  }

  orderParams() {
    return getOrderParameters(this)
  }
}
