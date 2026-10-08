export interface NavigationItem {
  label: string
  href?: string
  description?: string
  children?: NavigationGroup[]
}

export interface NavigationGroup {
  title: string
  description?: string
  items: NavigationItem[]
}

export interface NavigationSection {
  label: string
  overviewLabel?: string
  description?: string
  href?: string
  groups?: NavigationGroup[]
}
