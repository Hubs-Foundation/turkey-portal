import React, { MouseEventHandler, useEffect, useState } from 'react'
import { ButtonT, ButtonCategoriesE } from '../../../types/Form'
import { IconT } from '../../../types/General'
import styles from './Button.module.scss'
import Icon from '../Icon/Icon'

export type ButtonPropsT = {
  active?: boolean,
  id?: string,
  text: string,
  type?: ButtonT,
  category?: ButtonCategoriesE,
  disabled?: boolean,
  icon?: IconT
  onClick?: MouseEventHandler<HTMLButtonElement>,
  classProp?: string
}

const Button = ({
  active,
  id,
  text,
  type = 'button',
  category = ButtonCategoriesE.primary,
  disabled,
  icon,
  onClick,
  classProp = ''
}: ButtonPropsT) => {

  const [categoryClass, setCategoryClass] = useState(styles.button_primary)

  useEffect(() => {
    setButtonClass(category)
  }, [category])

  // Must pull generated SCSS class name
  const setButtonClass = (category: string) => {
    switch (category) {
      case ButtonCategoriesE.primary:
        setCategoryClass(styles.button_primary)
        break
      case ButtonCategoriesE.secondary:
        setCategoryClass(styles.button_secondary)
        break
      case ButtonCategoriesE.outline:
        setCategoryClass(styles.button_outline)
        break
    }
  }

  return (
    <button
      className={`${categoryClass} ${classProp} ${active ? styles.button_primary_active : ''}`}
      id={id}
      aria-label={text}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {
        icon ? (
          <Icon
            name={icon}
            color="currentColor"
            size={14}
          />
        ) : ''
      }
      {text}
    </button >
  )
}

export default Button