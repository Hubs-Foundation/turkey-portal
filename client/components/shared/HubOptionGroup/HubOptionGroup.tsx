import { useContext } from 'react'
import { FormContext } from '../Form/Form'
import HubOption from '@Shared/HubOption/HubOption'

type HubOptionGroupPropsT = {
  options: HubGroupOptionT[],
  name: string,
  classProp?: string
}

export type HubGroupOptionT = {
  value: number | string
  users: number
  size: string
  labelCategory: 'primary' | 'secondary'
  id: string
  label: string
  groupName: string
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
            labelCategory={option.labelCategory}
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
