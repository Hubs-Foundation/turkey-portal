import Image from 'next/image';
import SubCard from './SubCard/SubCard';
import SubInfoCard from './SubInfoCard/SubInfoCard';
import styles from './Subscribe.module.scss';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
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
          <SubInfoCard />

          {/* BUSINESS TIER  */}
          <SubCard
            title="Business"
            cta="Contact us"
            ctaUrl="mailto:enterprise-hubs@mozilla.com?subject=Subscription inquiries"
          >
            <p>
              Need dedicated infrastructure, custom clients, or something else?
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
    </section>
  );
};

export default Subscribe;
