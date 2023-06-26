import styles from './Resubscribe.module.scss';
import { SUBPLAT_SUBSCRIPTIONS_LINK } from 'config';

type ResubscribePropsT = {
  classProp?: string;
};

const Resubscribe = ({ classProp = '' }: ResubscribePropsT) => {
  return (
    <section className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>
        <h3 className="heading-xxs">Subscription Canceled</h3>
        <a
          className="secondary-link pt-6 block"
          href={SUBPLAT_SUBSCRIPTIONS_LINK}
        >
          Resubscribe
        </a>
      </div>
    </section>
  );
};

export default Resubscribe;
