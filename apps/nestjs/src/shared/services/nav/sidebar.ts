export interface ISidebarMenuItem {
  title?: string
  icon?: string
  route?: string[]
  hasPermAccess?: boolean
  children?: ISidebarMenuItem[]
}

export class SidebarMenuItem implements ISidebarMenuItem {
  public constructor(props?: Partial<ISidebarMenuItem>) {
    Object.assign(this, props)
  }

  title?: string
  icon?: string
  route?: string[]
  hasPermAccess?: boolean
  children?: ISidebarMenuItem[]
}

export interface ISidebarMenu {
  title?: string
  icon?: string
  route?: string[]
  isDivider?: boolean
  hasRoleAccess?: boolean
  children?: ISidebarMenuItem[]
  loadChildren: (self: ISidebarMenu) => void
}

export class SidebarMenu implements ISidebarMenu {
  public constructor(props?: Partial<ISidebarMenu>) {
    Object.assign(this, props)

    // eslint-disable-next-line antfu/if-newline
    if (this.loadChildren) this.loadChildren(this)
  }

  title?: string
  icon?: string
  route?: string[]
  isDivider?: boolean
  hasRoleAccess?: boolean
  children?: ISidebarMenuItem[]
  loadChildren: ((self: ISidebarMenu) => void) | any
}

export interface ISidebar {
  items: ISidebarMenu[]

  version?: string | number
}

export class Sidebar implements ISidebar {
  public constructor(props?: Partial<ISidebar>) {
    Object.assign(this, props)
  }

  items: ISidebarMenu[] = []
  version?: string | number
}
