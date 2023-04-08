import SubCard from './SubCard/SubCard';
import { StandardPlanCard } from './StandardPlanCard/StandardPlanCard';
import { StarterPlanCard } from './StarterPlanCard/StarterPlanCard';
import styles from './Subscribe.module.scss';
import { enabledStarterPlan } from 'util/utilities';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      {enabledStarterPlan() ? (
        <StarterPlanContent />
      ) : (
        <>
          <div className={styles.swoosh}>
            <svg viewBox="0 70 500 60" preserveAspectRatio="none">
              <rect x="0" y="0" width="500" height="500" fill="transparent" />
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div className={styles.container}>
            <div className={styles.cards}>
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
              <SubCard
                title="Business"
                cta="Contact us"
                ctaUrl="mailto:enterprise-hubs@mozilla.com?subject=Subscription inquiries"
              >
                <p>
                  Need dedicated infrastructure, custom clients, or something
                  else?
                </p>
              </SubCard>
            </div>
          </div>

          <div className={styles.swoosh_bottom}>
            <svg viewBox="0 70 500 60" preserveAspectRatio="none">
              <rect x="0" y="0" width="500" height="500" fill="transparent" />
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </>
      )}
    </section>
  );
};

const StarterPlanContent = () => {
  return (
    <>
      <SwooshTop />
      <div className={styles.starter_enabled_cards}>
        <StarterPlanCard />
        <StandardPlanCard />
      </div>
      <SwooshBottom />
      <div className={`${styles.pro_container} flex-justify-center`}>
        <div className={styles.pro_container_wrapper}>
          <div>
            <h2 className="mb-20">Pro</h2>
            <p className="heading-xxs">
              Short paragraph style text to describe what this demo hub is all
              about
            </p>
          </div>
          <div className={styles.contact_wrapper}>
            <Button
              label="Contact Hubs Team"
              text="Contact Hubs Team"
              category={ButtonCategoriesE.SECONDARY_SOLID}
            />
          </div>
        </div>
      </div>
    </>
  );
};
const SwooshTop = () => {
  return (
    <div
      className={`${styles.starter_enabled_swoosh} ${styles.starter_enabled_swoosh_top}`}
    >
      <svg viewBox="0 0 1659 211" fill="transparent" preserveAspectRatio="none">
        <rect x="0" y="0" width="500" height="500" fill="transparent" />
        <path
          d="M725 107C290.6 107.8 38 36 -34 0V210.5H1713.5C1584.5 152 1268 106 725 107Z"
          fill="#FFF"
        />
      </svg>
    </div>
  );
};

const SwooshBottom = () => {
  return (
    <div
      className={`${styles.starter_enabled_swoosh} ${styles.starter_enabled_swoosh_bottom}`}
    >
      <svg viewBox="0 0 1659 211" fill="transparent" preserveAspectRatio="none">
        <rect x="0" y="0" width="500" height="500" fill="transparent" />
        <path
          d="M725 107C290.6 107.8 38 36 -34 0V210.5H1713.5C1584.5 152 1268 106 725 107Z"
          fill="#170696"
        />
      </svg>
    </div>
  );
};

export default Subscribe;
