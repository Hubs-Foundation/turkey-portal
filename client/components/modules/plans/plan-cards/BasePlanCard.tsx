import { ReactNode } from 'react';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import { PlansE } from 'types/General';
import { PlanInfoCopyT } from '../plan.const';
import styles from './BasePlanCard.module.scss';
import InfoBlock from '@Shared/InfoBlock/InfoBlock';
import { Button, Icon } from '@mozilla/lilypad-ui';
import { isPlanLessThan } from 'util/utilities';

// PRICE DISPLAY COMPONENT
// Used for BasePlanCard "price" prop
type PricePropsT = {
  price: string;
  currencyAbbrev?: string;
  billingPeriod?: string;
};

export const Price = ({
  price,
  currencyAbbrev,
  billingPeriod,
}: PricePropsT) => {
  return (
    <div className={styles.price_container}>
      <div className={styles.price}>
        <h2 className="heading-lg">{price}</h2>
        <p>{currencyAbbrev}</p>
      </div>
      {billingPeriod && <p className={styles.price_cadence}>{billingPeriod}</p>}
    </div>
  );
};

export const Disclaimer = () => {
  return (
    <a
      className="primary-link"
      href="https://hubs.mozilla.com/docs/setup-choosing.html#supported-regions-and-currencies"
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex pt-24 mb-16">
        <div className="color-interaction-primary">
          <Icon name="info" classProp="mr-16" color="currentColor" />
        </div>

        <p className="paragraph-sm">
          Subscription plans are available in select countries
        </p>
      </div>
    </a>
  );
};

type BasePlanCardPropsT = {
  classProp?: string;
  title: string;
  price: ReactNode;
  plan: Exclude<PlansE, PlansE.LEGACY>;
  infoCopyList: PlanInfoCopyT[];
  additionalContent?: ReactNode;
  showDisclaimer?: boolean;
  confirmButton: ReactNode;
  footerClassProp?: string;
  color: 'silver' | 'warm' | 'rainbow';
  isSoldOut?: boolean;
};

const BasePlanCard = ({
  title,
  price,
  plan,
  infoCopyList,
  additionalContent,
  showDisclaimer = false,
  confirmButton,
  footerClassProp = '',
  isSoldOut = false,
  color,
  classProp = '',
}: BasePlanCardPropsT) => {
  const account = useSelector(selectAccount);

  /**
   * getCTA disects the logic so show if plan
   * is "current","sold out", or "less than"
   * current plan.
   */
  const getCTA = () => {
    const SoldOut = <Button label="sold out" text="sold out" />;
    const CurrentPlan = (
      <span className="body-md-semi-bold p-10">Current Plan*</span>
    );

    // Sold Out
    if (isSoldOut) {
      return SoldOut;
    }

    // Defualt Confirm Button
    if (!account.planName) {
      return confirmButton;
    }

    // Disable plans less than current
    if (isPlanLessThan(account.planName, plan)) {
      return null;
    }

    // Don't  let users click current plan
    if (account.planName === plan) {
      return CurrentPlan;
    }

    // If plan name is legacy "Standard" and card is
    // "Personal" then mark as current plan.
    if (account.planName === PlansE.LEGACY && plan === PlansE.PERSONAL) {
      return CurrentPlan;
    }

    return confirmButton;
  };

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      {isSoldOut && (
        <div className={styles.sold_out}>
          <div className="text-center">
            <h2 className="heading-xl mb-12">Sold Out!</h2>
            <p>(Temporarily)</p>
          </div>
        </div>
      )}
      <div
        className={`${styles.banner_gradient} ${styles['highlight_' + color]}`}
      />
      <div>
        {/* HEADER  */}
        <div>
          <div className="flex-justify-center">
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.price_wrapper}>{price}</div>
        </div>

        {/* CONTENT  */}
        <div className={styles.content}>
          {infoCopyList.map(({ label, description, icon }, i) => {
            return (
              <InfoBlock
                key={i}
                icon={icon}
                label={label}
                description={description}
              />
            );
          })}
        </div>
      </div>

      {/* FOOTER  */}
      <div className={styles.footer_wrapper}>
        {additionalContent}

        {showDisclaimer && <Disclaimer />}

        <div
          className={`${styles.footer} ${footerClassProp} flex-justify-center`}
        >
          {/* {getCTA()} */}
          <Button label="Subscribe" disabled={true} text="Subscribe" />
        </div>
      </div>
    </div>
  );
};

export default BasePlanCard;
