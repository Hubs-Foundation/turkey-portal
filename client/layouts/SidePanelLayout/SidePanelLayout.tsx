import { ReactNode, useMemo } from 'react';
import styles from './SidePanelLayout.module.scss';
import { HubT } from 'types/General';
import SidePanel from '@Modules/side-panel';
import FeedbackBanner from '@Shared/FeedbackBanner/FeedbackBanner';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import { SubscriptionT } from 'services/subscription.service';
import Hub, { loadingHub } from 'classes/Hub';
import Warning from '@Shared/Warning/Warning';

type SidePanelLayoutProps = {
  children: ReactNode;
  hub: HubT | undefined;
  subscription: SubscriptionT;
  isLoading?: boolean;
};

const SidePanelLayout = ({
  children,
  hub: _hub,
  subscription,
  isLoading,
}: SidePanelLayoutProps) => {
  const hub = useMemo(
    () => new Hub(_hub ? _hub : loadingHub),
    [_hub, loadingHub]
  );

  return (
    <>
      {/* <div className="flex-justify-center mt-20 px-20">
        <div className={styles.warning}>
          <Warning
            title="Be Advised"
            message="We are aware of an outage currently impacting Starter and Personal plans in one of our service regions. If your assigned URL contains 'us1' you may be affected by this outage. Our team is actively working to resolve the issue, and we appreciate your patience. We apologize for any inconvenience this may cause. If you have any questions regarding this issue, please contact us,"
            onClick={() => {
              window.open('mailto:hubs-feedback@mozilla.com');
            }}
          />
        </div>
      </div> */}
      <section className={styles.layout_wrapper}>
        {children}
        {/* SIDE PANEL WIDGET  */}
        <div className={styles.sidep_panel}>
          {!isLoading ? (
            <SidePanel
              fullDomain={hub.fullDomain}
              subscription={subscription}
            />
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
