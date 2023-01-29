import cls from './Footer.module.css'
import { FC, HTMLAttributes, memo, useMemo } from 'react'
import cn from 'classnames'

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}
interface ItemLink {
  title: string
  href: string
}

const links: ItemLink[] = [
  { title: 'Terms of use', href: 'https://www.google.com/' },
  { title: 'Privacy Policy', href: 'https://www.google.com/' }
]

export const Footer: FC<FooterProps> = memo(props => {
  const { className, ...rest } = props

  const mappedLinks = useMemo(
    () =>
      links.map(link => (
        <a
          key={link.title}
          className={cls.link}
          href={link.href}
          target='_blank'
        >
          {link.title}
        </a>
      )),
    []
  )

  return (
    <footer className={cn(cls.Footer, className)} {...rest}>
      <span className={cls.date}>
        Wan6sta © 2023 - {new Date().getFullYear()} All rights reserved
      </span>
      <div className={cls.links}>{mappedLinks}</div>
    </footer>
  )
})
