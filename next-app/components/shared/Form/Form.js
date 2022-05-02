import React, { useState } from 'react'

export const FormContext = React.createContext({
  form: {}
})

const Form = ({ 
  children, 
  submit = () => {}, 
  initialValues 
}) => {

  const [form, setForm] = useState(initialValues)
  const handleFormChange = (event) => {
    /**
     * Get name and value and set form context
     */
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <form className="Form">
      <FormContext.Provider value={{
        form:form,
        handleFormChange:handleFormChange
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