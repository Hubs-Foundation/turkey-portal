import { Button, ButtonCategoriesE, Dropdown } from '@mozilla/lilypad-ui';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { StatusE } from 'types/General';
import styles from './HubCardHeader.module.scss';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/accountSlice';
import { enabledStarterPlan } from 'util/featureFlag';

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
  const account = useSelector(selectAccount);
  const hasStarterPlan = enabledStarterPlan() && account.planName === 'starter';

  /**
   * Handle Setting Click
   */
  const handleSettingClick = useCallback(() => {
    router.push({
      pathname: '/hubs/[hub_id]',
      query: { hub_id: hubId },
    });
  }, [hubId, router]);

  const DropdownContent = (
    <div className="dropdown_wrapper">
      <button className="dropdown-link" onClick={handleSettingClick}>
        Edit Details
      </button>
    </div>
  );

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
      {!hasStarterPlan &&
        status !== StatusE.CREATING &&
        status !== StatusE.UPDATING && (
          <Dropdown
            alignment="right"
            width={164}
            cta={
              <Button
                icon="more-vertical"
                label="toggle"
                category={ButtonCategoriesE.PRIMARY_CLEAR}
              />
            }
            content={DropdownContent}
          />
        )}
    </div>
  );
};

export default HubCardHeader;