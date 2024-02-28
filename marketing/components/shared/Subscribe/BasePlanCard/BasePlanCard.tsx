import { ReactNode } from 'react';
import styles from './BasePlanCard.module.scss';
import { ValueProp } from '../plan.const';
import InfoBlock from '../InfoBlock/InfoBlock';
import { Icon } from '@mozilla/lilypad-ui';
import { FeaturesT } from '../plan.const';

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
    <section className={styles.price_wrapper}>
      <div className={styles.price_container}>
        <div className={styles.price}>
          <h2 className="heading-lg">{price}</h2>
          {currencyAbbrev && <p className="body-md ml-4">{currencyAbbrev}</p>}
        </div>
        {billingPeriod && (
          <p className={styles.price_cadence}>{billingPeriod}</p>
        )}
      </div>
    </section>
  );
};

type StatusPropsT = {
  icon: 'warning' | 'greenLight';
  message: string;
};

export const Status = ({ icon, message }: StatusPropsT) => {
  return (
    <section className="flex-align-center mb-12">
      {icon === 'warning' ? (
        <Icon name="alert-triangle" />
      ) : (
        <div className={styles.circle} />
      )}
      <span className="body-md ml-16">{message}</span>
    </section>
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
  color: 'silver' | 'warm' | 'rainbow';
  features?: FeaturesT | null;
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
  classProp = '',
}: BasePlanCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div
        className={`${styles.banner_gradient} ${styles['highlight_' + color]}`}
      />
      {/* HEADER  */}
      <section className="text-center">
        <h2 className="mb-6 heading-lg">{title}</h2>
        <p className="mb-12 body-md px-28-dt">{subtitle}</p>
      </section>

      <section className={styles.container}>
        {price}

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
        <div className={styles.footer}>{confirmButton}</div>
      </footer>
    </div>
  );
};
