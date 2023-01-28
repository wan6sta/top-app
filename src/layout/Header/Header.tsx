import cls from './Header.module.css'
import { FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = memo(props => {
  const { className, ...rest } = props
  return <header className={cn(cls.Header, className)} {...rest}></header>
})
