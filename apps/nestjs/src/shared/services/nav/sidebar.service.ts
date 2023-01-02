import { ISidebar, ISidebarMenu, ISidebarMenuItem, Sidebar } from './sidebar'

export class SidebarService {
  public sidebar!: ISidebar

  constructor() {
    this.newSidebar(new Sidebar())
  }

  /**
   * Create new sidebar
   *
   * @param sidebar ISidebar
   * @return void
   */
  public newSidebar(sidebar: ISidebar = new Sidebar()): SidebarService {
    this.sidebar = sidebar

    return this
  }

  /**
   * Get sidebar
   *
   * @returns ISidebar
   */
  public getSidebar(): ISidebar {
    return this.sidebar
  }

  /**
   * Add sidebar menu item
   *
   * @param menu ISidebarMenu
   * @returns SidebarService
   */
  public addMenu(menu: ISidebarMenu): SidebarService {
    this.sidebar.items.push(menu)

    return this
  }

  /**
   * Append child menu item to parent menu
   *
   * @param menu ISidebarMenu
   * @param child ISidebarMenuItem
   * @returns SidebarService
   */
  public appendChild(
    menu: ISidebarMenu,
    child: ISidebarMenuItem,
  ): SidebarService {
    this.sidebar.items
      .find((item: ISidebarMenu) => item === menu)
      ?.children?.push(child)

    return this
  }
}
