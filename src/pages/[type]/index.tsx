import { FC } from 'react'
import { withLayout } from '@/layout/Layout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { MenuItem } from '@/types/menuModel'
import axios from 'axios'
import { firstLevelMenu } from '@/helpers/helpers'
import process from 'process'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

const Type: FC<TypeProps> = props => {
  return <>Type</>
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({
  params
}: GetStaticPropsContext<NextParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    }
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
  if (!firstCategoryItem) {
    return {
      notFound: true
    }
  }

  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory: firstCategoryItem.id }
  )

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}

interface TypeProps {
  menu: MenuItem[]
  firstCategory: number
}

export default withLayout<TypeProps>(Type)
