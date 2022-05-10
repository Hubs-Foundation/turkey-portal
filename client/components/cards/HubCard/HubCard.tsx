import { useRouter } from 'next/router'
import styles from './HubCard.module.scss'
import Badge from '../../shared/Badge/Badge'
import Button from '../../shared/Button/Button'
import Icon from '../../shared/Icon/Icon'
import ExternalLink from '../../shared/ExternalLink/ExternalLink'
import IconButton from '../../shared/IconButton/IconButton'
import { TierT, StatusT } from '../../../types/General'
import { ButtonCategoriesE } from '../../../types/Form'

type HubCardPropsT = {
	name: string,
	tier: TierT,
	hubId: string,
	ccuLimit: number,
	status: StatusT,
	storageLimitMb: number,
	subdomain: string,
	classProp?: string
}

const HubCard = ({ name, tier, hubId, ccuLimit, status, storageLimitMb, subdomain, classProp = '' }: HubCardPropsT) => {

	// TODO configure status states
	const router = useRouter()
	const handleSettingClick = () => {
		router.push({
			pathname: '/hubs/[hub_id]',
			query: { hub_id: hubId },
		})
	}

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

					<div className={styles.card_domain}>
						<ExternalLink
							icon="external-link"
							target='_blank'
							href={`${subdomain}.myhubs.net`}>
							{subdomain}.myhubs.net
						</ExternalLink>
						<IconButton icon="copy" />
					</div>
				</div>

				{/* HUBS STATS */}
				<div className={styles.card_stats}>
					<div className={`${styles.card_stat} margin-bottom-10`}>
						<Icon name="users" color="currentColor" />
						<span className="margin-left-5">4/{ccuLimit} CCU</span>
					</div>
					<div className={styles.card_stat}>
						<Icon name="hard-drive" color="currentColor" />
						<span className="margin-left-5">73/{storageLimitMb} MB</span>
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
