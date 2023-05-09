import SubCard from './SubCard/SubCard';
import StandardPlanCard from './StandardPlanCard/StandardPlanCard';
import StarterPlanCard from './StarterPlanCard/StarterPlanCard';
import BusinessPlanCard from './BusinessPlanCard/BusinessPlanCard';
import styles from './Subscribe.module.scss';
import { enabledStarterPlan } from 'util/utilities';
import Swoosh from '@Shared/Swoosh/Swoosh';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <>
        <Swoosh location="top" />
        <div className={styles.container}>
          <div className={styles.cards}>
            {enabledStarterPlan() ? (
              <>
                <StarterPlanCard />
                <StandardPlanCard />
                <BusinessPlanCard />
              </>
            ) : (
              <>
                {/* TRY IT OUT  */}
                <SubCard
                  title="Explore Hubs"
                  classProp={styles.card_one}
                  cta="Try Mozilla's Hub"
                  ctaUrl="/Pvg5MMt/hubs-demo"
                >
                  <p>See the world in 3D and share it with your friends.</p>
                  <p>Try out a variety of avatars.</p>
                  <p>Tour incredible community Hubs.</p>
                </SubCard>

                {/* SUBSCRIBE  */}
                <StandardPlanCard />

                {/* BUSINESS TIER  */}
                <BusinessPlanCard />
              </>
            )}
          </div>
        </div>
        <Swoosh location="bottom" />
      </>
    </section>
  );
};

export default Subscribe;
