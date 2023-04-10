import { useCallback } from 'react';
import styles from './SubCard.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import { convertCurrency } from 'util/utilities';

type SubCardPropsT = {
  subscription: SubscriptionT;
  currency?: string;
  price?: number;
  classProp?: string;
};

const SubCard = ({ subscription, classProp = '' }: SubCardPropsT) => {
  /**
   * Get Formatted Date
   */

  const subscriptionDate = useCallback(
    (fullDate?: boolean) => {
      const date = new Date(Date.UTC(1970, 0, 1)); // Epoch
      date.setUTCSeconds(subscription.subscriptionEndTimestampS);
      const options: Intl.DateTimeFormatOptions = {
        year: fullDate ? 'numeric' : undefined,
        month: 'long',
        day: 'numeric',
      };
      // TODO : Tech Debt - when adding localization be sure to update this date format country code
      return date.toLocaleDateString('US', options);
    },
    [subscription]
  );

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>
        {/* PAYMENT */}
        <div className={styles.header_block}>
          <div>
            <span className={styles.price}>
              {/* TODO - tech debt localization
                  Use something like https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat 
                  or i18next to localize the price here - check with backend if they are already formatting anything since currency is being delivered
                  with response 
                */}
              {convertCurrency(subscription.currency)}
              {Number(subscription.amount).toFixed(2)}
            </span>
            <span className={styles.currency}>
              {subscription.currency} (+tax)
            </span>
          </div>
          <div className={styles.label}>Monthly Payment</div>
        </div>

        {/* NEXT PAYMENT */}
        <div className={styles.header_block}>
          <div className="flex-box">
            <div className={styles.month}>{subscriptionDate(false)}</div>
            <div className={styles.label}>Next Payment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCard;
