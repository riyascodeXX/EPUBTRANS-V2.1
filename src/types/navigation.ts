export interface NavigationItem {
  label: string
  href?: string
  description?: string
  children?: NavigationGroup[]
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

export interface NavigationSection {
  label: string
  href?: string
  groups?: NavigationGroup[]
}