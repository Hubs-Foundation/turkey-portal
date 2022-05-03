import PropTypes from 'prop-types'
import styles from './Badge.module.scss'

const Badge = ({name,type = 'primary'}) => {
  return (
    <div className={(type === 'primary') ? styles.badge_primary : styles.badge_secondary  }>
      {name}
    </div>
  )
}

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
}

export default Badge
