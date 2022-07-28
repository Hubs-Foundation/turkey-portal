import styles from './SubCard.module.scss';
import CardButton from '../../shared/CardButton/CardButton';
import { SubscriptionT } from 'services/subscription.service';

type SubCardPropsT = {
  subscription: SubscriptionT;
  price?: number;
  classProp?: string;
};

const SubCard = ({
  subscription,
  price = 5,
  classProp = '',
}: SubCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* PAYMENT */}
          <div className={styles.header_block}>
            <div>
              <span className={styles.price}>${price}.00</span>
              <span className={styles.currency}>USD</span>
            </div>
            <div className={styles.label}>Monthly Payment</div>
          </div>

          {/* NEXT PAYMENT */}
          <div className={styles.header_block}>
            <div className={styles.month}>{subscription.next_payment}</div>
            <div className={styles.label}>Next Payment</div>
          </div>
        </div>

        {/* WIDGET ACTIONS */}
        <CardButton
          icon="credit-card"
          title="Manage Subscription"
          description="Descriptive Text"
          classProp="margin-bottom-24"
        />

        <CardButton
          icon="settings"
          title="Admin Panel"
          description="Descriptive Text"
        />
      </div>
    </div>
  );
};

export default SubCard;
