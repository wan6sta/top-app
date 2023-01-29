import { FC } from 'react'
import { withLayout } from '@/layout/Layout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import axios from 'axios'
import * as process from 'process'
import { MenuItem } from '@/types/menuModel'
import { TopPageModel } from '@/types/topPageModel'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { ProductModel } from '@/types/productModel'

const firstCategory = 0

const Course: FC<CourseProps> = props => {
  const { menu, page, products } = props

  return <>{products && products.length}</>
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  )

  return {
    paths: menu.flatMap(m => m.pages.map(p => `/courses/${p.alias}`)),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({
  params
}: GetStaticPropsContext<NextParsedUrlQuery>) => {
  if (!params?.alias) {
    return {
      notFound: true
    }
  }

  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  )
  const { data: page } = await axios.get<TopPageModel>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`
  )
  const { data: products } = await axios.post<ProductModel[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
    {
      category: page?.category,
      limit: 10
    }
  )

  return {
    props: {
      menu,
      firstCategory,
      page,
      products
    }
  }
}

interface CourseProps {
  menu: MenuItem[]
  firstCategory: number
  page: TopPageModel
  products: ProductModel[]
}

export default withLayout<CourseProps>(Course)
