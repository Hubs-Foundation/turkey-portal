import styles from './RadioButton.module.scss'
import { FormEventHandler } from 'react'

type RadioButtonPropsT = {
  value: number | string,
  checked:boolean,
  isDisabled?:boolean,
  id: string,
  label:string,
  groupName:string,
  onChange: FormEventHandler<HTMLDivElement>
}

const RadioButton = ({
    label,
    value,
    checked = false, 
    isDisabled = false,
    id,
    groupName,
    onChange
  }:RadioButtonPropsT) => {

  return (
    <div className={styles.button_wrapper}>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type="radio" 
        name={groupName}
        value={value} 
        checked={checked}
        disabled={isDisabled}
        onChange={onChange}
      />
    </div>
  )
}

export default RadioButton
