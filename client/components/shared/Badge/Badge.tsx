import PropTypes from 'prop-types'
import styles from './Badge.module.scss'

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
  classProp: PropTypes.string
}

type BadgePropsT = PropTypes.InferProps<typeof propTypes>

const Badge = ({ name, type = 'primary', classProp = '' }: BadgePropsT) => {
  return (
    <div className={`${(type === 'primary') ? styles.badge_primary : styles.badge_secondary} ${classProp}`}>
      {name}
    </div>
  )
}

Badge.propTypes = propTypes

export default Badge
