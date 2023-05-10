import styles from './SidePanel.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import SubCard from '@Cards/SubCard/SubCard';
import { Icon, HubIcon } from '@mozilla/lilypad-ui';
import TileButton from '@Shared/TileButton/TileButton';
import UpgradePlan from '../UpgradePlan/UpgradePlan';
import { HUB_ROOT_DOMAIN } from 'config';
import SupportGrid from '../SupportGrid/SupportGrid';
import { useMobileDown } from 'hooks/useMediaQuery';
import { enabledStarterPlan } from 'util/featureFlag';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/accountSlice';

export type SidePanelPropsT = {
  subdomain: string;
  subscription: SubscriptionT;
  classProp?: string;
};

const SidePanel = ({
  subdomain,
  subscription,
  classProp = '',
}: SidePanelPropsT) => {
  const account = useSelector(selectAccount);
  const isMobile = useMobileDown();
  const hasStarter = enabledStarterPlan() && account.planName === 'starter';
  const hubUrl = `https://${subdomain}.${HUB_ROOT_DOMAIN}`;

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
      {account.hasSubscription && (
        <SubCard subscription={subscription} classProp={styles.subcard} />
      )}
      {hasStarter && <UpgradePlan />}

      <SupportGrid />
    </section>
  );
};

export default SidePanel;
