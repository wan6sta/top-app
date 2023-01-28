import cls from './Sidebar.module.css'
import { FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = memo(props => {
  const { className, ...rest } = props
  return <div className={cn(cls.Sidebar, className)} {...rest}></div>
})
