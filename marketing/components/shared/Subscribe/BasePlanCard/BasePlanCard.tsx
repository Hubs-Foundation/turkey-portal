import { ReactNode } from 'react';
import styles from './BasePlanCard.module.scss';
import { PlanInfoCopyT } from '../plan.const';
import InfoBlock from '../InfoBlock/InfoBlock';
import { Button } from '@mozilla/lilypad-ui';

// PRICE DISPLAY COMPONENT
// USED FOR BasePlanCard "PRICE" PROP
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

type BasePlanCardPropsT = {
  classProp?: string;
  title: string;
  price: ReactNode;
  infoCopyList: PlanInfoCopyT[];
  additionalContent?: ReactNode;
  confirmButton: ReactNode;
  footerClassProp?: string;
  color: 'silver' | 'warm';
  isSoldOut?: boolean;
};

export const BasePlanCard = ({
  title,
  price,
  infoCopyList,
  additionalContent,
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

          {/* Additional Content */}
          {additionalContent}
        </div>
      </div>

      {/* FOOTER  */}

      <div className={`${styles.footer_wrapper}`}>
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
