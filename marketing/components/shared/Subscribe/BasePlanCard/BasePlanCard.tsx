import { ReactNode } from 'react';
import styles from './BasePlanCard.module.scss';
import { PlanInfoCopyT } from '../plan.const';
import InfoBlock from '../InfoBlock/InfoBlock';
import { Button, Icon } from '@mozilla/lilypad-ui';

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
  infoCopyList: PlanInfoCopyT[];
  additionalContent?: ReactNode;
  showDisclaimer?: boolean;
  confirmButton: ReactNode;
  footerClassProp?: string;
  color: 'silver' | 'warm' | 'rainbow';
  isSoldOut?: boolean;
};

export const BasePlanCard = ({
  title,
  price,
  infoCopyList,
  additionalContent,
  showDisclaimer = false,
  confirmButton,
  footerClassProp = '',
  color,
  isSoldOut = false,
  classProp = '',
}: BasePlanCardPropsT) => {
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
      {/* HEADER  */}
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>
        <div className={styles.price_wrapper}>{price}</div>

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

      <div className={`${styles.footer_wrapper}`}>
        {additionalContent}

        {showDisclaimer && <Disclaimer />}
        <div
          className={`${styles.footer} ${footerClassProp} flex-justify-center`}
        >
          {isSoldOut ? (
            <Button label="sold out" text="sold out" />
          ) : (
            confirmButton
          )}
        </div>
      </div>
    </div>
  );
};
