import { ReactNode } from 'react';
import styles from './BasePlanCard.module.scss';
import { ValueProp } from '../plan.const';
import InfoBlock from '../InfoBlock/InfoBlock';
import { Button, Icon } from '@mozilla/lilypad-ui';
import { FeaturesT } from '../plan.const';

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
        {currencyAbbrev && <p className="body-md ml-4">{currencyAbbrev}</p>}
      </div>
      {billingPeriod && <p className={styles.price_cadence}>{billingPeriod}</p>}
    </div>
  );
};

const SoldOut = () => {
  return (
    <div className={styles.sold_out}>
      <div>
        <h2 className="heading-xl mb-12">Sold Out!</h2>
        <p>(Temporarily)</p>
      </div>
    </div>
  );
};

type BasePlanCardPropsT = {
  classProp?: string;
  title: string;
  subtitle?: string;
  price: ReactNode;
  valueProps: ValueProp[];
  additionalContent?: ReactNode;
  confirmButton: ReactNode;
  footerClassProp?: string;
  color: 'cool' | 'warm' | 'rainbow';
  features?: FeaturesT | null;
  isSoldOut?: boolean;
};

export const BasePlanCard = ({
  title,
  subtitle,
  price,
  valueProps,
  additionalContent,
  confirmButton,
  color,
  features,
  isSoldOut = false,
  classProp = '',
}: BasePlanCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      {isSoldOut && <SoldOut />}

      <div
        className={`${styles.banner_gradient} ${styles['highlight_' + color]}`}
      />
      {/* HEADER  */}
      <section className="text-center">
        <h2 className="mb-6 heading-lg">{title}</h2>
        <p className="mb-12 body-md px-28">{subtitle}</p>
      </section>

      <section className={styles.container}>
        <div className={styles.price_wrapper}>{price}</div>

        {/* VALUE PROPS  */}
        {valueProps.map(({ label, description, icon }, i) => {
          return (
            <InfoBlock
              key={i}
              icon={icon}
              label={label}
              description={description}
            />
          );
        })}
      </section>

      <hr className={styles.hr} />

      {/* FEATURES  */}
      <section className="body-md mt-10 mb-80">
        <p className="mb-12">{features?.title}</p>
        <div>
          {features?.values.map((value, i) => {
            return (
              <div key={i} className="flex mb-12">
                <div className="color-semantic-success mr-12">
                  <Icon
                    color="currentColor"
                    name="check"
                    size={24}
                    classProp={styles.check}
                  />
                </div>
                <p className="pt-2">{value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER  */}

      <footer className={`${styles.footer_wrapper}`}>
        {additionalContent}
        <div className={styles.footer}>
          {isSoldOut ? (
            <Button label="sold out" text="sold out" />
          ) : (
            confirmButton
          )}
        </div>
      </footer>
    </div>
  );
};
