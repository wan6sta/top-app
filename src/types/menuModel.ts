import { TopLevelCategory } from '@/types/topPageModel'

export interface MenuItem {
  _id: {
    secondCategory: string
  }
  isOpen?: boolean
  pages: PageItem[]
}

export interface PageItem {
  alias: string
  title: string
  _id: string
  category: string
}

export interface FirstLevelMenuItem {
  route: string
  name: string
  icon: JSX.Element
  id: TopLevelCategory
}
