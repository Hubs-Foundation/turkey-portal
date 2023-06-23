import { useCallback } from 'react';
import styles from './NextPayment.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import { SUBPLAT_SUBSCRIPTIONS_LINK } from 'config';
import { CurrencySymbolMap } from 'types/Countries';

type NextPaymentPropsT = {
  subscription: SubscriptionT;
  price?: number;
  classProp?: string;
};

/**
 * COMPONENT NOT IN USE
 *
 * Note: this component is being phased out. There is a possibility that this component could
 * come back into play. Keeping around for now. -  06/23/23 NG
 */

const CanceledBlock = () => (
  <>
    <h3 className="heading-xxs">Subscription Canceled</h3>
    <a className="secondary-link pt-6 block" href={SUBPLAT_SUBSCRIPTIONS_LINK}>
      Resubscribe
    </a>
  </>
);

type PaymentBlockPropsT = {
  subscription: SubscriptionT;
};

const PaymentBlock = ({ subscription }: PaymentBlockPropsT) => {
  const { amount, currency } = subscription;
  return (
    <>
      <div className="flex-box">
        <span className={styles.price}>
          {/* TODO - tech debt localization
          Use something like https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat 
          or i18next to localize the price here - check with backend if they are already formatting anything since currency is being delivered
          with response 
        */}
          {CurrencySymbolMap[currency]}
          {Number(amount).toFixed(2)}
        </span>
        <span className={styles.currency}>{currency} (+tax)</span>
      </div>
      <p className={styles.label}>Monthly Payment</p>
    </>
  );
};

const NextPayment = ({ subscription, classProp = '' }: NextPaymentPropsT) => {
  const { isCancelled } = subscription;

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
        <div className={styles.content_block}>
          {isCancelled ? (
            <CanceledBlock />
          ) : (
            <PaymentBlock subscription={subscription} />
          )}
        </div>

        {/* NEXT PAYMENT */}
        <div className={styles.content_block}>
          <div className="flex-box">
            <p className={styles.month}>{subscriptionDate(false)}</p>
            <p className={styles.label}>
              {isCancelled ? 'Starter Plan Begins' : 'Next Payment'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPayment;
