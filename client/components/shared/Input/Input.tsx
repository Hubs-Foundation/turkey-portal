import { useContext, ChangeEventHandler, ChangeEvent, useState, useEffect } from 'react'
import { FormContext } from '../Form/Form'
import styles from './Input.module.scss'
import { InputT } from '../../../types/Form'

type InputProps = {
  label: string,
  name: string,
  type?: InputT,
  info?: string,
  classProp?: string,
  onChange?: Function,
  validator?: Function
  required?: boolean
  errorMessage?: string
}

const Input = ({ label, type = 'text', name, info, classProp = '', onChange, validator, required = false, errorMessage='Invaid Input' }: InputProps) => {

  const formContext = useContext(FormContext)
  const { form, handleFormChange } = formContext
  const [isValid, setIsValid] = useState(true)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [initialValue, setInitialValue] = useState(Object.keys(form).length != 0 ? form[name] : '')
  const [currentValue, setCurrentValue] = useState(Object.keys(form).length != 0 ? form[name] : '')



  /**
   * Bifercates Prop and Context handlers
   * @param event 
   */
  const relayChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setIsDirty(initialValue !== newValue)
    handleFormChange(event)
    setCurrentValue(newValue)
    onChange && onChange(newValue)
  }


  useEffect(() => {

    if (validator) {
      setIsValid(validator(currentValue))
    }

  }, [currentValue])


 
  return (
    <div className={`${styles.input_wrapper} ${classProp}`}>
      {
        Object.keys(form).length != 0 && (
          <>
            <label>{label} {`${isDirty}`}</label>
            <input
              required={required}
              placeholder={label}
              type={type}
              name={name}
              value={form[name]}
              onChange={relayChange}
            />

            {/* Addition Input Information  */}
            {
              info && isValid ? <span className={styles.info}>{info}</span> : ''
            }

            {/* Input Error Message  */}
            {
              !isValid ? <span className={styles.info}>{errorMessage}</span> : ''
            }
          </>
        )
      }
    </div>
  )
}

export default Input
