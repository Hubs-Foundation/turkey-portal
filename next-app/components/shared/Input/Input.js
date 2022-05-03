import { useContext } from 'react'
import { FormContext } from '../Form/Form'
import styles from './Input.module.scss'

const Input = ({ label, type, name }) => {
  
  const formContext = useContext(FormContext)
  // Get data and methods from form context
  const { form, handleFormChange } = formContext

  return (
    <div className={styles.input_wrapper}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleFormChange}
      />
    </div>
  )
}

export default Input
