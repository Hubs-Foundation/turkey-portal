import React from 'react'
import styles from './SkeletonCard.module.scss'

type SkeletonCardPropsT = {
  category: 'square' | 'row'
  qty: number
}

const SkeletonCard = ({ category, qty = 1 }: SkeletonCardPropsT) => {
  return (
    <div className={`${styles.card_wrapper} ${category === 'square' ? styles.square_wrapper : styles.row_wrapper}`}>
      {
        [...Array(qty)].map(() => {
          return <div className={`${styles.card} ${category === 'square' ? styles.square : styles.row}`}></div>
        })
      }
    </div>
  )
}


export default SkeletonCard