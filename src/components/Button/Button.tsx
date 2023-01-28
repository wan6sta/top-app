import cls from './Button.module.css'
import { ButtonHTMLAttributes, FC, memo, PropsWithChildren } from 'react'
import cn from 'classnames'
import ArrowIcon from './arrow.svg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: 'primary' | 'outline'
  arrow?: 'right' | 'down' | 'none'
}

export const Button: FC<PropsWithChildren<ButtonProps>> = memo(props => {
  const {
    mode = 'primary',
    children,
    className,
    arrow = 'none',
    ...rest
  } = props

  return (
    <button className={cn(cls.Button, cls[mode], className)} {...rest}>
      {children}
      {arrow !== 'none' ? (
        <ArrowIcon className={cn(cls.arrow, cls[arrow])} />
      ) : null}
    </button>
  )
})
