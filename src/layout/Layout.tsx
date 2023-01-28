import cls from './Layout.module.css'
import React, { FC, PropsWithChildren } from 'react'
import { Header } from '@/layout/Header/Header'
import { Footer } from '@/layout/Footer/Footer'
import { Sidebar } from '@/layout/Sidebar/Sidebar'

export const Layout: FC<PropsWithChildren> = props => {
  const { children } = props

  return (
    <main className={cls.Layout}>
      <Header className={cls.Header} />
      <Sidebar className={cls.Sidebar} />
      <section className={cls.MainContent}>{children}</section>
      <Footer className={cls.Footer} />
    </main>
  )
}

export const withLayout = <T extends Record<string, unknown>>(
  Component: FC<T>
) => {
  return (props: T) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )
}
