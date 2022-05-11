import React, { MouseEventHandler } from 'react'
import { ButtonT } from '../../../types/Form'
import { IconT } from '../../../types/General'
import styles from './IconButton.module.scss'
import Icon from '../Icon/Icon'

type IconButtonProps = {
  active?: boolean,
  id?: string,
  label?: string,
  type?: ButtonT,
  disabled?: boolean,
  icon: IconT
  onClick?: MouseEventHandler<HTMLButtonElement>,
  classProp?: string
}

const IconButton = ({
  active,
  id,
  label,
  type = 'button',
  disabled,
  icon,
  onClick,
  classProp = ''
}: IconButtonProps) => {


  return (
    <button
      className={`${classProp} ${styles.icon_button} ${active ? styles.icon_button_active : ''}`}
      id={id}
      aria-label={label}
      type={type}
      disabled={disabled}
      onClick={onClick}>
      <Icon
        name={icon}
        color="currentColor"
        size={20}
      />
    </button >
  )
}

export default IconButton