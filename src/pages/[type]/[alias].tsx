import { FC } from 'react'
import { withLayout } from '@/layout/Layout'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import axios from 'axios'
import * as process from 'process'
import { MenuItem } from '@/types/menuModel'
import {TopLevelCategory, TopPageModel} from '@/types/topPageModel'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'
import { ProductModel } from '@/types/productModel'
import {firstLevelMenu} from "@/helpers/helpers";

const Course: FC<CourseProps> = props => {
  const { menu, page, products, firstCategory } = props

  return <>{products && products.length}</>
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: m.id }
    )
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
  }

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CourseProps> = async ({
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

  try {
    const { data: menu } = await axios.post<MenuItem[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
      { firstCategory: firstCategoryItem.id }
    )

    if (menu.length === 0) {
      return {
        notFound: true
      }
    }

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
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    }
  } catch (e) {
    return {
      notFound: true
    }
  }
}

interface CourseProps {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}

export default withLayout<CourseProps>(Course)
