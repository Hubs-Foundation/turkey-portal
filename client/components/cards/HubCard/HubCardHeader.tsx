import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { StatusE } from 'types/General';
import styles from './HubCardHeader.module.scss';

type HubCardHeaderPropsT = {
  hubId: string;
  status: StatusE;
  classProp?: string;
};

const HubCardHeader = ({
  hubId,
  status,
  classProp = '',
}: HubCardHeaderPropsT) => {
  const router = useRouter();

  /**
   * Handle Setting Click
   */
  const handleSettingClick = useCallback(() => {
    router.push({
      pathname: '/hubs/[hub_id]',
      query: { hub_id: hubId },
    });
  }, [hubId, router]);

  return (
    <div className={`${classProp} ${styles.card_header}`}>
      <div className={styles.card_status_wrapper}>
        <div
          className={`${styles.card_status}  ${
            styles['card_status_' + status]
          }`}
        ></div>
        <div className="ml-10 capitalize">{status}</div>
      </div>

      {/* Edit Hubs Details  */}
      {status !== StatusE.CREATING && status !== StatusE.UPDATING && (
        <Button
          label="edit details"
          onClick={handleSettingClick}
          text="Edit Details"
          category={ButtonCategoriesE.PRIMARY_OUTLINE}
        />
      )}
    </div>
  );
};

export default HubCardHeader;
