import styles from './NextPayment.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import { SUBPLAT_SUBSCRIPTIONS_LINK } from 'config';
import Subscription from 'types/Subscription';

type NextPaymentPropsT = {
  subscription: SubscriptionT;
  currency?: string;
  price?: number;
  classProp?: string;
};

const CanceledBlock = () => (
  <>
    <h3 className="heading-xxs">Subscription Canceled</h3>
    <a className="secondary-link pt-6 block" href={SUBPLAT_SUBSCRIPTIONS_LINK}>
      Resubscribe
    </a>
  </>
);

type PaymentBlockPropsT = {
  amount: string | null;
  currency: string | null;
  currencySymbol: string | undefined;
};

const PaymentBlock = ({
  amount,
  currency,
  currencySymbol,
}: PaymentBlockPropsT) => {
  return (
    <>
      <div className="flex-box">
        <span className={styles.price}>
          {currencySymbol}
          {amount}
        </span>
        <span className={styles.currency}>{currency} (+tax)</span>
      </div>
      <p className={styles.label}>Monthly Payment</p>
    </>
  );
};

const NextPayment = ({
  subscription: _subscription,
  classProp = '',
}: NextPaymentPropsT) => {
  const subscription = new Subscription(_subscription);

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>
        {/* PAYMENT */}
        <div className={styles.content_block}>
          {subscription.isCancelled ? (
            <CanceledBlock />
          ) : (
            <PaymentBlock
              currencySymbol={subscription.getCurrencySymbol()}
              currency={subscription.currency}
              amount={subscription.moneyFormat()}
            />
          )}
        </div>

        {/* NEXT PAYMENT */}
        <div className={styles.content_block}>
          <div className="flex-box">
            <p className={styles.month}>
              {subscription.getFormattedDate(false)}
            </p>
            <p className={styles.label}>
              {subscription.isCancelled
                ? 'Starter Plan Begins'
                : 'Next Payment'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextPayment;
