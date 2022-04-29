import React, { useState, ChangeEventHandler, ChangeEvent } from 'react'

const initialForm: { [char: string]: string } = {}
const initialFormHandler: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) => { }

export const FormContext = React.createContext({
  form: initialForm,
  handleFormChange: initialFormHandler
})

type FormPropsT = {
  children: React.ReactNode,
  submit: Function,
  initialValues: { [key: string]: string }
}

const Form = ({
  children,
  submit = () => { },
  initialValues
}: FormPropsT) => {

  const [form, setForm] = useState(initialValues)

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent) => {
    //Get name and value and set form context
    const { name, value }: HTMLInputElement = (event.target as HTMLInputElement)
    setForm((formState: any) => { return { ...formState, [name]: value } })
  }

  console.log('form', form)

  return (
    <form className="Form">
      <FormContext.Provider value={{
        form,
        handleFormChange
      }}>
        {children}
      </FormContext.Provider>

      <button type="button" onClick={() => submit(form)}>
        Submit
      </button>
    </form>
  )
}


export default Form