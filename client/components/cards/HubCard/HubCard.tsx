import { useCallback } from 'react'
import { useRouter } from 'next/router'
import styles from './HubCard.module.scss'
import Badge from '../../shared/Badge/Badge'
import Button from '../../shared/Button/Button'
import Icon from '../../shared/Icon/Icon'
import ExternalLink from '../../shared/ExternalLink/ExternalLink'
import IconButton from '../../shared/IconButton/IconButton'
import Spinner from '../../shared/Spinner/Spinner'
import { TierT, StatusT } from '../../../types/General'
import { ButtonCategoriesE } from '../../../types/Form'

type HubCardPropsT = {
  name: string,
  tier: TierT,
  hubId: string,
  currentCcu: number
  currentStorage: number
  ccuLimit: number,
  status: StatusT,
  storageLimitMb: number,
  subdomain: string,
  classProp?: string
}

const HubCard = ({ name, tier, hubId, currentCcu, currentStorage, ccuLimit, status, storageLimitMb, subdomain, classProp = '' }: HubCardPropsT) => {

  const router = useRouter()
  const handleSettingClick = useCallback(() => {
    router.push({
      pathname: '/hubs/[hub_id]',
      query: { hub_id: hubId },
    })
  }, [hubId, router])

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      {/* CARD NAME TIER STATES  */}
      <div className="flex-justify-between">

        {/* NAME / TIER  */}
        <div className={styles.card_group}>
          <div className="flex-align-center margin-bottom-10">
            <Badge name={tier} />
            <div className={styles.card_name}>{name}</div>
          </div>

          {/* TODO: Replace the hardcoded ".myhubs.net" to an environment variable */}
          {
            status !== 'ready' ? (
              <div className='flex-align-center'>
                <Spinner size={18} />
                <span className='u-font-14 margin-left-10'><span className='u-capitalize'>{status}</span> your hub...</span>
              </div>
            ) : (
              <div className={styles.card_domain}>
                <ExternalLink
                  icon="external-link"
                  target='_blank'
                  href={`${subdomain}.myhubs.net`}>
                  {subdomain}.myhubs.net
                </ExternalLink>
                <IconButton icon="copy" />
              </div>
            )
          }

        </div>

        {/* HUBS STATS */}
        <div className={styles.card_stats}>
          <div className={`${styles.card_stat} margin-bottom-10`}>
            <Icon name="users" color="currentColor" />
            <span className="margin-left-5">{currentCcu ? currentCcu : 0}/{ccuLimit} CCU</span>
          </div>
          <div className={styles.card_stat}>
            <Icon name="hard-drive" color="currentColor" />
            <span className="margin-left-5">{currentStorage ? currentStorage : 0}/{storageLimitMb} MB</span>
          </div>
        </div>

        {/* CARD ACTIONS  */}
        <div className={styles.card_actions_wrapper}>
          <Button
            onClick={handleSettingClick}
            classProp="margin-right-15"
            text="Hub Settings"
            category={ButtonCategoriesE.outline}
          />
          <ExternalLink
            target='_blank'
            href={`https://${subdomain}.myhubs.net/admin`}>
            <Button
              text="Admin Panel"
              category={ButtonCategoriesE.outline}
            />
          </ExternalLink>
        </div>

      </div>
    </div>
  )
}

export default HubCard
