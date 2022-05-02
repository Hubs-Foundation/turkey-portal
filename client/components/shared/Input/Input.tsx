import { useContext, ChangeEventHandler } from 'react'
import { FormContext } from '../Form/Form'
import styles from './Input.module.scss'
import { InputT } from '../../../types/Form'

type InputProps = {
  label: string,
  name: string,
  type: InputT
}

const Input = ({ label, type, name }: InputProps) => {

  const formContext = useContext(FormContext)
  // Get data and methods from form context
  const { form, handleFormChange } = formContext


  return (
    <div className={styles.input_wrapper}>
      {
        form && (
          <>
            <label>{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleFormChange}
            />
          </>
        )
      }

    </div>
  )
}

export default Input