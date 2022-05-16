import { useContext } from 'react'
import { FormContext } from '../Form/Form'
import HubOption from '../HubOption/HubOption'
import { HubGroupOptionT } from '../../../types/Form'

type HubOptionGroupPropsT = {
  options: HubGroupOptionT[],
  name: string,
  classProp?: string
}

const HubOptionGroup = ({ options = [], name, classProp = '' }: HubOptionGroupPropsT) => {
  const formContext = useContext(FormContext)
  // Get data and methods from form context
  const { form, handleFormChange } = formContext

  return (
    <div className={classProp}>
      {options.map((option) => {
        return (
          <HubOption
            checked={option.value === form[name]}
            key={option.id}
            label={option.label}
            labelType={option.labelType}
            value={option.value}
            size={option.size}
            users={option.users}
            groupName={option.groupName}
            onChange={handleFormChange}
            id={option.id}
          />
        )
      })}
    </div>
  )
}

export default HubOptionGroup
