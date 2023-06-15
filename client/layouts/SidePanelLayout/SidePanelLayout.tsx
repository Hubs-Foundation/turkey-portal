import { ReactNode } from 'react';
import styles from './SidePanelLayout.module.scss';
import { HubT } from 'types/General';
import SidePanel from '@Modules/side-panel';
import FeedbackBanner from '@Shared/FeedbackBanner/FeedbackBanner';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import { SubscriptionT } from 'services/subscription.service';

type SidePanelLayoutProps = {
  children: ReactNode;
  hub: HubT | null;
  subscription: SubscriptionT;
  isLoading?: boolean;
};

const SidePanelLayout = ({
  children,
  hub,
  subscription,
  isLoading,
}: SidePanelLayoutProps) => {
  return (
    <>
      <section className={styles.layout_wrapper}>
        {children}
        {/* SIDE PANEL WIDGET  */}
        <div className={styles.sidep_panel}>
          {!isLoading && hub ? (
            <SidePanel subdomain={hub.subdomain} subscription={subscription} />
          ) : (
            <SkeletonCard
              qty={1}
              category="square"
              classProp={styles.sidep_panel_skeleton}
            />
          )}
        </div>
      </section>

      <footer>
        <FeedbackBanner />
      </footer>
    </>
  );
};

export default SidePanelLayout;
