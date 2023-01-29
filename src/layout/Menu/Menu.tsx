import cls from './Menu.module.css'
import { memo, useContext, useMemo } from 'react'
import { AppContext } from '@/context/appContext'
import { FirstLevelMenuItem, PageItem } from '@/types/menuModel'
import CoursesIcon from './icons/courses.svg'
import BooksIcon from './icons/books.svg'
import ProductsIcon from './icons/products.svg'
import ServicesIcon from './icons/services.svg'
import { TopLevelCategory } from '@/types/topPageModel'
import cn from 'classnames'

const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products
  }
]

export const Menu = memo(() => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)

  const mappedMenu = useMemo(() => {
    return firstLevelMenu.map(m => {
      const isActiveMenuItem = m.id === firstCategory
      return (
        <div
          className={cls.menuItem}
          key={m.route}
        >
          <a href={`/${m.route}`} className={cn(cls.link, {
            [cls.activeMenuItem]: isActiveMenuItem
          })}>
            {m.icon}
            <span>{m.name}</span>
          </a>
          {buildSecondLevelCategory(m)}
        </div>
      )
    })
  }, [menu])

  function buildSecondLevelCategory(firstLevelMenuItem: FirstLevelMenuItem) {
    return (
     <div className={cls.secondCategoryWrapper}>
       {menu.map(m => (
         <div className={cls.secondCategory} key={m._id.secondCategory}>
           <span className={cls.secondCategoryTitle}>{m._id.secondCategory}</span>
           <div
             className={cn(cls.secondLevelBlock, {
               [cls.secondLevelBlockOpen]: m.isOpen
             })}
           >{buildThirdLevelCategory(m.pages, firstLevelMenuItem.route)}</div>
         </div>
       ))}
     </div>
    )
  }

  function buildThirdLevelCategory(pages: PageItem[], route: string) {
    return (
      <div className={cls.thirdLevelCategory}>
        {pages.map(p => (
          <a
            href={`/${route}/${p.alias}`}
            className={cn(cls.thirdMenuItem, {
              [cls.thirdMenuItemActive]: false
            })}
          >
            {p.category}
          </a>
        ))}
      </div>
    )
  }

  return (
    <nav className={cls.Menu}>
      <div className={cls.firstLevelMenu}>{mappedMenu}</div>
    </nav>
  )
})
