import cls from './Menu.module.css'
import { useContext } from 'react'
import { AppContext } from '@/context/appContext'

export const Menu = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)

  return (
    <nav className={cls.Menu}>
      {menu.map(el => (
        <li key={el._id.secondCategory}>{el._id.secondCategory}</li>
      ))}
    </nav>
  )
}
