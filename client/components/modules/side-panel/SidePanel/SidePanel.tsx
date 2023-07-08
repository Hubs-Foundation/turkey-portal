import styles from './SidePanel.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import Resubscribe from '../Resubscribe/Resubscribe';
import { Icon, HubIcon } from '@mozilla/lilypad-ui';
import TileButton from '@Shared/TileButton/TileButton';
import UpgradePlan from '../UpgradePlan/UpgradePlan';
import SupportGrid from '../SupportGrid/SupportGrid';
import { useMobileDown } from 'hooks/useMediaQuery';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/accountSlice';
import { useIsProfessional } from 'hooks/usePlans';

export type SidePanelPropsT = {
  domain: string;
  subdomain: string;
  subscription: SubscriptionT;
  classProp?: string;
};

const SidePanel = ({
  domain,
  subdomain,
  subscription,
  classProp = '',
}: SidePanelPropsT) => {
  const account = useSelector(selectAccount);
  const isMobile = useMobileDown();
  const isProfessional = useIsProfessional();
  const hubUrl = `https://${subdomain}.${domain}`;

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.tile_buttons}>
        <TileButton
          title="Admin Panel"
          color="--color-brand-4"
          icon={<Icon name="settings" color="currentColor" />}
          link={`${hubUrl}/admin`}
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
            link={`${hubUrl}/spoke/projects`}
          />
        )}
      </div>

      {/* PRICE  */}
      {account.hasSubscription && subscription.isCancelled && (
        <Resubscribe classProp={styles.subcard} />
      )}
      {!isProfessional && <UpgradePlan />}

      <SupportGrid />
    </section>
  );
};

export default SidePanel;
