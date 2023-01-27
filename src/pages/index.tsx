import { Button, Htag, P, Tag } from '@/components'

export default function Home() {
  return (
    <main>
      <Htag tag='h1'>Hello world!</Htag>
      <br />
      <Button arrow='right'>Primary</Button>
      <Button arrow='down'>Primary</Button>
      <Button mode='outline' arrow='right'>
        Outline
      </Button>
      <Button mode='outline' arrow='down'>
        Outline
      </Button>
      <br />
      <P size='l'>
        Напишу сразу в двух курсах, так как проходил оба. Java будет многим
        непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего
        положения языка как самого популярного в программировании. Выбор мой пал
        на эту профессию еще и потому, что Java-
      </P>
      <br />
      <P>
        Напишу сразу в двух курсах, так как проходил оба. Java будет многим
        непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего
        положения языка как самого популярного в программировании. Выбор мой пал
        на эту профессию еще и потому, что Java-
      </P>
      <br />
      <P size='s'>
        Напишу сразу в двух курсах, так как проходил оба. Java будет многим
        непросвещённым сложновата в изучении, но здесь перевес из-за лидирующего
        положения языка как самого популярного в программировании. Выбор мой пал
        на эту профессию еще и потому, что Java-
      </P>
      <br />
      <Tag mode='outline'>outline</Tag>
      <Tag>primary</Tag>
      <Tag mode='danger'>danger</Tag>
      <Tag mode='success'>success</Tag>
      <br />
      <Tag mode='outline' size='m'>
        outline
      </Tag>
      <Tag size='m'>primary</Tag>
      <Tag mode='danger' size='m'>
        danger
      </Tag>
      <Tag mode='success' size='m'>
        success
      </Tag>
      <br />
      <Tag mode='outline' size='m' href='https://www.google.com/'>
        google
      </Tag>
    </main>
  )
}
