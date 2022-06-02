import React from 'react'
import Icon from '@Shared/Icon/Icon'
import styles from './Spinner.module.scss'

type SpinnerPropsT = {
  size?: number
}

const Spinner = ({ size = 20 }: SpinnerPropsT) => {
  return (
    <Icon classProp={styles.loader_wrapper} name="loader" size={size} color="#0D73A6" />
  )
}

export default Spinner