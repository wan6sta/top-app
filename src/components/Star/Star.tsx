import cls from './Star.module.css'
import { FC, memo, useMemo, useRef, useState } from 'react'
import StarIcon from './star.svg'
import cn from 'classnames'

interface StarProps {
  isEditable?: boolean
  rating: number
  setRating?: (rating: number) => void
}

export const Star: FC<StarProps> = memo(props => {
  const { isEditable = false, rating, setRating } = props
  const [starsRating, setStarsRating] = useState(() => rating)
  const prevRef = useRef(rating)

  const mappedStars = useMemo(() => {
    const emptyArray = new Array(5).fill(<></>)
    return emptyArray.map((_, elIndex) => (
      <div
        key={elIndex}
        className={cn(cls.starIcon, {
          [cls.fillStarIcon]: elIndex < starsRating,
          [cls.isEditableIcon]: isEditable
        })}
        onMouseEnter={() => changeDisplay(elIndex + 1)}
        onMouseLeave={() => onMouseLeaveChangeDisplay(rating)}
        onClick={() => changeRating(elIndex + 1)}
      >
        <StarIcon />
      </div>
    ))
  }, [starsRating])

  function changeDisplay(elIndex: number) {
    if (!isEditable || !setRating) return
    setStarsRating(prev => elIndex)
  }

  function onMouseLeaveChangeDisplay(elIndex: number) {
    if (!isEditable || !setRating) return
    if (prevRef.current !== rating) return
    setStarsRating(prev => elIndex)
  }

  function changeRating(elIndex: number) {
    if (!isEditable || !setRating) return
    setRating(elIndex)
    prevRef.current = elIndex
  }

  return <div className={cls.Star}>{mappedStars}</div>
})

// let i = 0
//
// export const StarOld: FC<StarProps> = memo(props => {
//   const { isEditable = false, rating: ratingProps, setRating } = props
//   const [starsRating, setStarsRating] = useState<JSX.Element[]>([])
//   i++
//   useEffect(() => {
//     constructStars(ratingProps)
//   }, [ratingProps])
//
//   function constructStars(rating: number) {
//     const emptyArray = new Array(5).fill(<></>)
//     const mappedStars = emptyArray.map((_, elIndex) => (
//       <div
//         key={elIndex}
//         className={cn(cls.starIcon, {
//           [cls.fillStarIcon]: elIndex < rating,
//           [cls.isEditableIcon]: isEditable
//         })}
//         onMouseEnter={() => changeDisplay(elIndex + 1)}
//         onMouseLeave={() => changeDisplay(ratingProps)}
//         onClick={() => changeRating(elIndex + 1)}
//       >
//         <StarIcon />
//       </div>
//     ))
//     setStarsRating(mappedStars)
//   }
//
//   function changeDisplay(elIndex: number) {
//     if (!isEditable || !setRating) return
//     constructStars(elIndex)
//   }
//
//   function changeRating(elIndex: number) {
//     if (!isEditable || !setRating) return
//     setRating(elIndex)
//   }
//
//   console.log('Star render', i / 2)
//
//   return <div className={cls.Star}>{starsRating}</div>
// })
