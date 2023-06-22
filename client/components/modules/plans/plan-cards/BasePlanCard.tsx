import { ReactNode } from 'react';
import { PlanInfoCopyT } from '../PlanInfoCopy';
import styles from './BasePlanCard.module.scss';
import InfoBlock from '@Shared/InfoBlock/InfoBlock';

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
};

const BasePlanCard = ({
  classProp = '',
  title,
  price,
  infoCopyList,
  additionalContent,
  confirmButton,
  footerClassProp = '',
  color,
}: BasePlanCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div
        className={`${styles.banner_gradient} ${styles['highlight_' + color]}`}
      />
      <div>
        {/* HEADER  */}
        <div>
          <h2 className={styles.title}>{title}</h2>
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

        {/* LOCATION CONFIRMATION  */}
        {additionalContent}
      </div>

      {/* FOOTER  */}
      <div className={styles.footer_wrapper}>
        <div className={`${styles.footer} ${footerClassProp}`}>
          {confirmButton}
        </div>
      </div>
    </div>
  );
};

export default BasePlanCard;
