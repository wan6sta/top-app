import cls from './Star.module.css'

import FillStarIcon from './fillStar.svg'
import StarIcon from './star.svg'
import { useState } from 'react'

export const Star = () => {
  const [stars, setStars] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false
  ])

  const hoverHandler = (i: number) => {
    setStars(stars.map((star, starIndex) => starIndex <= i))
  }

  const mappedStars = stars?.map((star, i) => (
    <div onMouseOver={() => hoverHandler(i)} key={i}>
      {star ? <FillStarIcon /> : <StarIcon />}
    </div>
  ))

  return <div className={cls.Star}>{mappedStars}</div>
}
