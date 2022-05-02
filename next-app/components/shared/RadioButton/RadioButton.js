import PropTypes from 'prop-types'
import styles from './RadioButton.module.scss'

const RadioButton = ({
    label,
    value,
    checked = false, 
    isDisabled = false,
    id,
    groupName,
    onChange
  }) => {

  return (
    <div className={styles.button_wrapper}>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type="radio" 
        name={groupName}
        value={value} 
        checked={checked}
        disabled={isDisabled}
        onChange={onChange}
      />
    </div>
  )
}

RadioButton.propTypes = {
  label:PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  id:PropTypes.string.isRequired,
  groupName:PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default RadioButton
