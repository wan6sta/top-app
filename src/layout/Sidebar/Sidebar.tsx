import cls from './Sidebar.module.css'
import { FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'
import { Menu } from '@/layout/Menu/Menu'

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = memo(props => {
  const { className, ...rest } = props
  return (
    <aside className={cn(cls.Sidebar, className)} {...rest}>
      <div className={cls.logoImg}></div>
      <Menu />
    </aside>
  )
})
