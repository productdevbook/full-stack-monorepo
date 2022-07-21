import { ObjectType } from '@nestjs/graphql'
import relayTypes from '../types/relay.types'
import { SqlData } from '../types/sql-data.type'
import { Menu } from '../entities/menu.entity'
import { Page } from '../entities/page.entity'
import { PageMenu } from '../entities/page-menu.entity'

@ObjectType()
export class MenusResponse extends relayTypes<Menu>(Menu) {}
@ObjectType()
export class PagesResponse extends relayTypes<Page>(Page) {}
@ObjectType()
export class SqlResponse extends relayTypes<SqlData>(SqlData) {}
@ObjectType()
export class PageMenusResponse extends relayTypes<PageMenu>(PageMenu) {}
