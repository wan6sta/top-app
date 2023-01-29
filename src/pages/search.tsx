import { FC } from 'react'
import { withLayout } from '@/layout/Layout'
import { GetStaticProps } from 'next'
import {MenuItem} from "@/types/menuModel";
import axios from "axios";

const Search: FC<SearchProps> = props => {

  return (
    <>
      Search
    </>
  )
}

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    { firstCategory }
  )

  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface SearchProps {
  menu: MenuItem[]
  firstCategory: number
}

export default withLayout<SearchProps>(Search)
