import SubCard from './SubCard/SubCard';
import StandardPlanCard from './StandardPlanCard/StandardPlanCard';
import StarterPlanCard from './StarterPlanCard/StarterPlanCard';
import BusinessPlanCard from './BusinessPlanCard/BusinessPlanCard';
import styles from './Subscribe.module.scss';
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
            <StarterPlanCard />
            <StandardPlanCard />
            <BusinessPlanCard />
          </div>
        </div>
        <Swoosh location="bottom" />
      </>
    </section>
  );
};

export default Subscribe;
