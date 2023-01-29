import { createContext, FC, PropsWithChildren, useState } from 'react'
import { MenuItem } from '@/types/menuModel'
import { TopLevelCategory } from '@/types/topPageModel'

export interface AppContextProps {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  setMenu?: (newMenu: MenuItem[]) => void
}

export const AppContext = createContext<AppContextProps>({
  menu: [],
  firstCategory: TopLevelCategory.Courses
})

export const AppContextProvider: FC<
  PropsWithChildren<AppContextProps>
> = props => {
  const { children, menu, firstCategory, setMenu } = props
  const [menuState, setMenuState] = useState<MenuItem[]>(() => menu)

  return (
    <AppContext.Provider
      value={{ menu: menuState, setMenu: setMenuState, firstCategory }}
    >
      {children}
    </AppContext.Provider>
  )
}
