import Image from 'next/image';
import SubContactCard from './SubContactCard/SubContactCard';
import SubInfoCard from './SubInfoCard/SubInfoCard';
import styles from './Subscribe.module.scss';

type SubscribePropsT = { classProp?: string };

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
        <div className={styles.header}>
          <h1>Your account has no active hubs</h1>
          {/* TODO pull pricing from subplat - $20 */}
          <p>
            You can begin a new subscription with an Early Access Hub for $20 a
            month
          </p>
        </div>

        <div className={styles.cards}>
          <SubInfoCard />
          <SubContactCard />
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
