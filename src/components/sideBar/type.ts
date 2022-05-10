export interface SideBarItemType {
  name: string
  href?: string
  id?: number
  onClick?: (e?: any) => void
  activeId?: number | string
  active?: boolean
}
