import { useContext, ChangeEventHandler, ChangeEvent} from 'react'
import { FormContext } from '../Form/Form'
import styles from './Input.module.scss'
import { InputT } from '../../../types/Form'

type InputProps = {
  label: string,
  name: string,
  type?: InputT,
  info?:string,
  classProp?: string,
  onChange?:Function
}

const Input = ({ label, type = 'text', name,info, classProp = '', onChange }: InputProps) => {

  const formContext = useContext(FormContext)
  // Get data and methods from form context
  const { form, handleFormChange } = formContext

  const relayChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    handleFormChange(event)
    onChange && onChange(event.target.value)
  }

  return (
    <div className={`${styles.input_wrapper} ${classProp}`}>
      {
        form && (
          <>
            <label>{label}</label>
            <input
              placeholder={label}
              type={type}
              name={name}
              value={form[name]}
              onChange={relayChange}
            />
            {
              info ? <span className={styles.info}>{info}</span>:''
            }
          </>
        )
      }

    </div>
  )
}

export default Input
