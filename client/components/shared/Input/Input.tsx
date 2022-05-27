import { useContext, ChangeEventHandler, ChangeEvent, useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { FormContext } from '../Form/Form'
import styles from './Input.module.scss'
import { InputT } from '../../../types/Form'
import FadeIn from '../../util/FadeIn'

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
  info = '',
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
  const [isValid, setIsValid] = useState<boolean>(false)
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
      focusInput: () => inputRef.current?.focus(),
      isDirty: () => isDirty
    }
  })

  /**
   * Bifurcates Prop and Context handlers
   * @param event 
   */
  const relayChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setCurrentValue(newValue)

    // Handle Context and prop event handlers
    handleFormChange(event)
    onChange && onChange(newValue)

    // If initial value was empty any change makes form dirty
    const isDirty = initialValue === '' ? true : initialValue !== newValue
    setIsDirty(isDirty)
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
    if (!isValid) {
      const message = errorMessage ? errorMessage : validationMessage
      message ? setCurrentErrorMessage(message) : ''
    }
    setIsValid(isValid)

  }, [currentValue])


  return (
    <div className={`${styles.input_wrapper}  ${!isValid && isDirty ? styles.input_error : null} ${classProp}`}>
      {
        Object.keys(form).length != 0 && (
          <>
            <label>{label}</label>
            
            {/* Addition Input Information  */}
            <span className={styles.info}>{info}</span> 

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

            {/* Input Error Message  */}
            {
              <FadeIn isVisible={isDirty && !isValid} >
                <span className={styles.error_message}>
                  {currentErrorMessage}
                </span>
              </FadeIn>
            }
          </>
        )
      }
    </div>
  )
})

export default Input
