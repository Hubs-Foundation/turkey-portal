import React from 'react'
import styles from './SkeletonCard.module.scss'
import './SkeletonCard.module.scss'

type SkeletonCardPropsT = {
  category: 'square' | 'row'
  qty: number
}

const SkeletonCard = ({ category, qty = 1 }: SkeletonCardPropsT) => {
  return (
    <div className={`${styles.card_wrapper} ${category === 'square' ? styles.square_wrapper : styles.row_wrapper}`}>
      {
        [...Array(qty)].map(() => {
          return <div className={`${styles.card} pulse ${category === 'square' ? styles.square : styles.row}`}></div>
        })
      }
    </div>
  )
}


export default SkeletonCard