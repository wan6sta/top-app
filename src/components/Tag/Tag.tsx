import cls from './Tag.module.css'
import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'

interface TagProps {
  size?: 'm' | 's'
  mode?: 'primary' | 'outline' | 'success' | 'danger'
  href?: string
}

export const Tag: FC<PropsWithChildren<TagProps>> = props => {
  const { mode = 'primary', size = 's', href, children } = props

  if (href) {
    return (
      <a
        href={href}
        className={cn(cls.Tag, cls[mode], cls[size], cls.link)}
        target='_blank'
      >
        {children}
      </a>
    )
  }

  return <div className={cn(cls.Tag, cls[mode], cls[size])}>{children}</div>
}
