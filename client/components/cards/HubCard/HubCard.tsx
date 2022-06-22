import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './HubCard.module.scss';
import Badge from '@Shared/Badge/Badge';
import Button from '@Shared/Button/Button';
import Icon from '@Shared/Icon/Icon';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import IconButton from '@Shared/IconButton/IconButton';
import Spinner from '@Shared/Spinner/Spinner';
import { TierT, StatusT } from 'types/General';
import { ButtonCategoriesE } from 'types/Form';
import { HUB_ROOT_DOMAIN } from 'config';

type HubCardPropsT = {
  name: string;
  tier: TierT;
  hubId: string;
  currentCcu: number | null;
  currentStorageMb: number | null;
  ccuLimit: number;
  status: StatusT;
  storageLimitMb: number;
  subdomain: string;
  classProp?: string;
};

const HubCard = ({
  name,
  tier,
  hubId,
  currentCcu,
  currentStorageMb,
  ccuLimit,
  status,
  storageLimitMb,
  subdomain,
  classProp = '',
}: HubCardPropsT) => {
  const router = useRouter();
  const handleSettingClick = useCallback(() => {
    router.push({
      pathname: '/hubs/[hub_id]',
      query: { hub_id: hubId },
    });
  }, [hubId, router]);

  /**
   * Hub Loading State
   */
  const LoadingHub = (
    <div className="flex-align-center">
      <Spinner size={18} />
      <span className="u-font-14 margin-left-10">
        <span className="u-capitalize">{status}</span> your hub...
      </span>
    </div>
  );

  /**
   * Hub External Link
   */
  const HubLink = (
    <div className={styles.card_domain}>
      <ExternalLink
        icon="external-link"
        target="_blank"
        href={`${subdomain}.${HUB_ROOT_DOMAIN}`}
      >
        {subdomain}.{HUB_ROOT_DOMAIN}
      </ExternalLink>
      <IconButton icon="copy" />
    </div>
  );

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

          {/* TODO: Error Handeling design*/}
          {status === 'creating' || status === 'updating'
            ? LoadingHub
            : HubLink}
        </div>

        {/* HUBS STATS */}
        <div className={styles.card_stats}>
          <div className={`${styles.card_stat} margin-bottom-10`}>
            <Icon name="users" color="currentColor" />
            {/* TODO: Working with design to establish all the 'Hub states' this includes 
            hubs creation / update phases, data points and error handeling, related todo
            is also to impliment Websocket for data point updates.  */}

            {/* TODO: Error Handeling design*/}
            <span className="margin-left-5">
              {currentCcu}/{ccuLimit} CCU
            </span>
          </div>
          <div className={styles.card_stat}>
            <Icon name="hard-drive" color="currentColor" />
            {/* TODO: Error Handeling design*/}
            <span className="margin-left-5">
              {currentStorageMb}/{storageLimitMb} MB
            </span>
          </div>
        </div>

        {/* CARD ACTIONS  */}
        <div className={styles.card_actions_wrapper}>
          <Button
            onClick={handleSettingClick}
            classProp="margin-right-15"
            text="Hub Settings"
            category={ButtonCategoriesE.PRIMARY_OUTLINE}
          />
          <ExternalLink
            target="_blank"
            href={`https://${subdomain}.${HUB_ROOT_DOMAIN}/admin`}
          >
            <Button text="Admin Panel" category={ButtonCategoriesE.PRIMARY_OUTLINE} />
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default HubCard;
