import { useContext, ChangeEventHandler, ChangeEvent, useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { FormContext } from '../Form/Form'
import styles from './Input.module.scss'
import { InputT } from '../../../types/Form'

/**
 * Methods available to access the component
 * in the parent component.
 */
export type InputInterfaceT = {
  focusInput: Function
  isDirty: Function
}

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
  pattern?: string
  maxLength?: number
  minLength?: number,
}

const Input = forwardRef(({
  label,
  type = 'text',
  name,
  info,
  classProp = '',
  onChange,
  validator = () => true,
  required = false,
  errorMessage,
  pattern,
  maxLength,
  minLength,
}: InputProps, ref) => {

  const formContext = useContext(FormContext)
  const { form, handleFormChange } = formContext
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [initialValue, setInitialValue] = useState(Object.keys(form).length != 0 ? form[name] : '')
  const [currentValue, setCurrentValue] = useState(Object.keys(form).length != 0 ? form[name] : '')
  const [currentErrorMessage, setCurrentErrorMessage] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  /**
  * Exposed Component API
  */
  useImperativeHandle(ref, () => {
    return {
      focusInput: focusInput,
      isDirty: () => isDirty
    }
  })


  const focusInput = () => {
    inputRef.current?.focus()
  }

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

  /**
   * Validate Input
   */
  useEffect(() => {
    const input = inputRef.current
    const valid = input?.validity.valid
    const validationMessage = input?.validationMessage
    // Validate against html and js validators
    const isValid = valid && validator(currentValue)

    // Prop error message takes precedence 
    if (!isValid && validationMessage) setCurrentErrorMessage(errorMessage ? errorMessage : validationMessage)
    setIsValid(isValid)

  }, [currentValue])


  return (
    <div className={`${styles.input_wrapper}  ${!isValid ? styles.input_error : null} ${classProp}`}>
      {
        Object.keys(form).length != 0 && (
          <>
            <label>{label}</label>
            <input
              ref={inputRef}
              required={required}
              placeholder={label}
              pattern={pattern}
              type={type}
              name={name}
              value={form[name]}
              onChange={relayChange}
              maxLength={maxLength}
              minLength={minLength}
            />

            {/* Addition Input Information  */}
            {
              info && isValid ? <span className={styles.info}>{info}</span> : ''
            }

            {/* Input Error Message  */}
            {
              !isValid ? <span className={styles.info}>{currentErrorMessage}</span> : ''
            }
          </>
        )
      }
    </div>
  )
})

export default Input
