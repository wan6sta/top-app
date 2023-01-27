import cls from './P.module.css'
import { FC, HTMLAttributes, PropsWithChildren } from 'react'
import cn from 'classnames'

interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 's' | 'm' | 'l'
}

export const P: FC<PropsWithChildren<PProps>> = props => {
  const { size = 'm', className, children, ...rest } = props

  return (
    <p className={cn(cls.P, className, cls[size])} {...rest}>
      {children}
    </p>
  )
}
