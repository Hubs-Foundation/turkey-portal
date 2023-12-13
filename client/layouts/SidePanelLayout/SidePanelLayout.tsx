import { ReactNode, useMemo } from 'react';
import styles from './SidePanelLayout.module.scss';
import { HubT } from 'types/General';
import SidePanel from '@Modules/side-panel';
import FeedbackBanner from '@Shared/FeedbackBanner/FeedbackBanner';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import { SubscriptionT } from 'services/subscription.service';
import Hub, { loadingHub } from 'classes/Hub';
import Warning from '@Shared/Warning/Warning';
import { Button } from '@mozilla/lilypad-ui';

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
      {hub.hasReachedMaxStorage() && (
        <div className="flex-justify-center mt-20 px-20">
          <div className={styles.warning}>
            <Warning
              title="Content Storage Limit Exceeded"
              message="You’ve reached the maximum data capacity for your current plan. To avoid performance issues with your Hub, please upgrade your plan or delete content from your Hub."
            >
              <div className="flex-justify-end ">
                <Button
                  href="/subscribe"
                  text="Upgrade Now"
                  classProp="mr-12"
                />
                <Button
                  href="https://hubs.mozilla.com/docs/setup-faq.html"
                  text="More info"
                  category="primary_outline"
                  target="_blank"
                />
              </div>
            </Warning>
          </div>
        </div>
      )}

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
