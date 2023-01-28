import cls from './Footer.module.css'
import { FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = memo(props => {
  const { className, ...rest } = props
  return <div className={cn(cls.Footer, className)} {...rest}></div>
})
