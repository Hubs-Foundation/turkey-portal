import styles from './SidePanel.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import Resubscribe from '../Resubscribe/Resubscribe';
import { Icon, HubIcon } from '@mozilla/lilypad-ui';
import TileButton from '@Shared/TileButton/TileButton';
import UpgradePlan from '../UpgradePlan/UpgradePlan';
import SupportGrid from '../SupportGrid/SupportGrid';
import GettingStartedPanel from '../GettingStartedPanel/GettingStartedPanel';
import { useMobileDown } from 'hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/accountSlice';
import { useIsBusiness } from 'hooks/usePlans';

export type SidePanelPropsT = {
  fullDomain: string;
  subscription: SubscriptionT;
  classProp?: string;
};

const SidePanel = ({
  fullDomain,
  subscription,
  classProp = '',
}: SidePanelPropsT) => {
  const account = useSelector(selectAccount);
  const isMobile = useMobileDown();
  const isBusiness = useIsBusiness();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.tile_buttons}>
        <TileButton
          title="Admin Panel"
          color="--color-brand-4"
          icon={<Icon name="settings" color="currentColor" />}
          link={`${fullDomain}/admin`}
        />
        {!isMobile && (
          <TileButton
            title="Scene Editor"
            color="--color-brand-2"
            icon={
              <HubIcon
                name="space"
                classProp={styles.space_icon}
                color="currentColor"
              />
            }
            link={`${fullDomain}/spoke/projects`}
          />
        )}
      </div>

      {/* PRICE  */}
      {account.hasSubscription && subscription.isCancelled && (
        <Resubscribe classProp={styles.subcard} />
      )}
      {!isBusiness && <UpgradePlan />}

      <GettingStartedPanel />
      <SupportGrid />
    </section>
  );
};

export default SidePanel;
