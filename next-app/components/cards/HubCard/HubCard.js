import PropTypes from 'prop-types'
import styles from './HubCard.module.scss'
import Badge from '../../shared/Badge/Badge'
import IconLink from '../../shared/IconLink/IconLink'

const HubCard = ({name,tier}) => {
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.card_contianer}>


        {/* CARD NNAME TIER STATES  */}
        <div className="flex-justify-between">

          {/* NAME / TIER  */}
          <div className={styles.card_group}>
            <div className={styles.card_name}>{name}</div>
            <Badge name={'Free'}/>
          </div>

          {/* HUBS STATS */}
          <div className={styles.card_stats}>
            <div className={styles.card_stat}> 4/5 CCU </div>
            <div className={styles.card_stat}> 73/100 MB </div>
          </div>
        </div>

        <div className="flex-justify-between">

          {/* DOMAIN */}
          <div className="flex">
            <div className={styles.card_domain}>a2b60d57a6.myhubs.net</div>
            <Badge type="secondary" name={'Creating'}/>
          </div>

          <IconLink to={`/`} icon="⚙️" />
        </div>


      </div>
    </div>
  )
}

HubCard.propTypes = {

}

export default HubCard