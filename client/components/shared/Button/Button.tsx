import React, { MouseEventHandler, useEffect, useState } from 'react'
import { ButtonT, ButtonCategoriesE } from '../../../types/Form'
import styles from './Button.module.scss'

type ButtonProps = {
  active?: boolean,
  id?: string,
  text: string,
  type?: ButtonT,
  category?: ButtonCategoriesE,
  disabled?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({
  active,
  id,
  text,
  type = 'button',
  category = ButtonCategoriesE.primary,
  disabled,
  onClick
}: ButtonProps) => {

  const [categoryClass, setCategoryClass] = useState(styles.button_primary)

  useEffect(() => {
    setButtonClass(category)
  }, [category])

  // Need to set generatedscss module class 
  const setButtonClass = (category: string) => {
    switch (category) {
      case ButtonCategoriesE.primary:
        setCategoryClass(styles.button_primary)
        break
      case ButtonCategoriesE.secondary:
        setCategoryClass(styles.button_secondary)
        break
    }
  }

  return (
    <button
      className={`${categoryClass} ${active ? 'active' : ''}`}
      id={id}
      aria-label={text}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      {text}
    </button >
  )
}

export default Button