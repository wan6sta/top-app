import cls from './Menu.module.css'
import { memo, useContext, useMemo } from 'react'
import { AppContext } from '@/context/appContext'
import { FirstLevelMenuItem, PageItem } from '@/types/menuModel'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {firstLevelMenu} from "@/helpers/helpers";

export const Menu = memo(() => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const router = useRouter()

  const openSecondLevel = (secondCategoryTitle: string) => {
    if (!setMenu) return

    setMenu(menu.map(m => m._id.secondCategory === secondCategoryTitle ? {...m, isOpen: !m.isOpen} : m))
  }

  const mappedMenu = useMemo(() => {
    return firstLevelMenu.map(m => {
      const isActiveMenuItem = m.id === firstCategory
      return (
        <div className={cls.menuItem} key={m.route}>
          <Link
            href={`/${m.route}`}
            className={cn(cls.link, {
              [cls.activeMenuItem]: isActiveMenuItem
            })}
          >
            {m.icon}
            <span>{m.name}</span>
          </Link>
          {buildSecondLevelCategory(m)}
        </div>
      )
    })
  }, [menu, router.asPath])

  function buildSecondLevelCategory(firstLevelMenuItem: FirstLevelMenuItem) {
    return (
      <div className={cls.secondCategoryWrapper}>
        {menu?.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpen = true
          }
          return (
            <div className={cls.secondCategory} key={m._id.secondCategory}>
            <span onClick={() => openSecondLevel(m._id.secondCategory)} className={cls.secondCategoryTitle}>
              {m._id.secondCategory}
            </span>
              <div
                className={cn(cls.secondLevelBlock, {
                  [cls.secondLevelBlockOpen]: m.isOpen
                })}
              >
                {buildThirdLevelCategory(m.pages, firstLevelMenuItem.route)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function buildThirdLevelCategory(pages: PageItem[], route: string) {
    return (
      <div className={cls.thirdLevelCategory}>
        {pages.map(p => (
          <Link
            key={p._id}
            href={`/${route}/${p.alias}`}
            className={cn(cls.thirdMenuItem, {
              [cls.thirdMenuItemActive]: `/${route}/${p.alias}` === router.asPath
            })}
          >
            {p.category}
          </Link>
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
