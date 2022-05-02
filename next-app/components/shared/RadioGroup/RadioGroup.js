import PropTypes from 'prop-types'
import RadioButton from '../RadioButton/RadioButton'

const RadioGroup = ({ options = [], onChange, value }) => {
  return (
    <div onChange={onChange}>
      {options.map((option) => {
        return (
          <RadioButton
            checked={option.value === value}
            key={option.id}
            label={option.label}
            value={option.value}
            groupName={option.groupName}
            onChange={onChange}
            id={option.id} 
          />
        )
      })}
    </div>
  )
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      groupName: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default RadioGroup
