import PropTypes from 'prop-types'
import styles from './Badge.module.scss'

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary']),
}

type BadgePropsT = PropTypes.InferProps<typeof propTypes>

const Badge = ({ name, type = 'primary' }: BadgePropsT) => {
  return (
    <div className={(type === 'primary') ? styles.badge_primary : styles.badge_secondary}>
      {name}
    </div>
  )
}

Badge.propTypes = propTypes

export default Badge
