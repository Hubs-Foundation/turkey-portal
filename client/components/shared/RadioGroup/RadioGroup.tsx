import { useContext } from 'react'
import { FormContext } from '@Shared/Form/Form'
import RadioButton from '@Shared/RadioButton/RadioButton'
import { RadioGroupOptionT } from 'types/Form'

type RadioGroupPropsT = {
  options: RadioGroupOptionT[],
  name: string,
  classProp?: string
}

// onChange
const RadioGroup = ({ options = [], name, classProp = '' }: RadioGroupPropsT) => {
  const formContext = useContext(FormContext)
  // Get data and methods from form context
  const { form, handleFormChange } = formContext

  return (
    <div className={classProp}>
      {options.map((option) => {
        return (
          <RadioButton
            checked={option.value === form[name]}
            key={option.id}
            label={option.label}
            value={option.value}
            groupName={option.groupName}
            onChange={handleFormChange}
            id={option.id}
          />
        )
      })}
    </div>
  )
}

export default RadioGroup
