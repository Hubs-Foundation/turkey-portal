import styles from './SubCard.module.scss';
import CardButton from '../../shared/CardButton/CardButton';

type SubCardPropsT = {
  classProp?: string;
};

const SubCard = ({ classProp = '' }: SubCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* PAYMENT */}
          <div className={styles.header_block}>
            <div>
              <span className={styles.price}>$5.00</span>
              <span className={styles.currency}>USD</span>
            </div>
            <div className={styles.label}>Monthly Payment</div>
          </div>

          {/* NEXT PAYMENT */}
          <div className={styles.header_block}>
            <div className={styles.month}>February</div>
            <div className={styles.label}>Next Payment</div>
          </div>
        </div>

        {/* WIDGET ACTIONS */}
        <CardButton
          icon="settings"
          title="Manage Subscription"
          description="Descriptive Text"
          classProp="margin-bottom-24"
        />

        <CardButton
          icon="settings"
          title="Manage Subscription"
          description="Descriptive Text"
        />
      </div>
    </div>
  );
};

export default SubCard;
