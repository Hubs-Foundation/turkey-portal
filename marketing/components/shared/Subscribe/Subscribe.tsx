import Image from 'next/image';
import SubContactCard from './SubContactCard/SubContactCard';
import SubInfoCard from './SubInfoCard/SubInfoCard';
import styles from './Subscribe.module.scss';

type SubscribePropsT = {
  region: string | null;
  classProp?: string;
};

const Subscribe = ({ region, classProp = '' }: SubscribePropsT) => {
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
          <SubInfoCard region={region} />
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
