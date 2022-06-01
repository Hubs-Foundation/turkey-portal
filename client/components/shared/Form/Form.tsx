import React, { useState, ChangeEventHandler, ChangeEvent, ReactNode } from 'react'
import Button from '@Button'
import { ButtonCategoriesE } from 'types/Form'
import styles from './Form.module.scss'


const initialForm: { [key: string]: string | number | readonly string[] | undefined } = {}
const initialFormHandler: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) => { }

export const FormContext = React.createContext({
  form: initialForm,
  handleFormChange: initialFormHandler
})

type FormPropsT = {
  children: ReactNode,
  submit: Function,
  cancelClick?: Function,
  initialValues: { [key: string]: string | number | readonly string[] | undefined },
  classProp?: string
}

const Form = ({
  children,
  submit = () => { },
  cancelClick,
  initialValues,
  classProp = ''
}: FormPropsT) => {

  const [form, setForm] = useState(initialValues)

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) => {
    //Get name and value and set form context
    const { name, value }: HTMLInputElement = (event.target as HTMLInputElement)
    setForm((formState: any) => { return { ...formState, [name]: value } })
  }

  const handleCancelClick = () => {
    cancelClick && cancelClick()
  }

  return (
    <form className={classProp} >
      <FormContext.Provider value={{
        form,
        handleFormChange
      }}>
        {children}
      </FormContext.Provider>

      <div className={styles.actions_wrapper}>
        {
          cancelClick && (
            <Button
              onClick={handleCancelClick}
              category={ButtonCategoriesE.outline}
              text="Back"
            />
          )
        }

        <Button
          onClick={() => submit(form)}
          category={ButtonCategoriesE.primary}
          text="Submit"
        />
      </div>
    </form>
  )
}

export default Form