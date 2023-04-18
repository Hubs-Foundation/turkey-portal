import { ReactNode } from 'react';
import { PlanInfoCopyT } from './PlanInfoCopy';
import styles from './BasePlanCard.module.scss';
import { RegionsT } from 'types/Countries';
import { getCurrencyMeta } from 'util/utilities';
import { InfoBlock } from '@Shared/InfoBlock/InfoBlock';

// PRICE DISPLAY COMPONENT
type PricePropsT = {
  region: RegionsT | null;
  price: string;
  priceCadence?: string;
};

export const Price = ({ region, price, priceCadence }: PricePropsT) => {
  const currency = region ? getCurrencyMeta(region) : null;

  return (
    <div className={styles.price_container}>
      <div className={styles.price}>
        {currency ? (
          <>
            <h2>
              {currency.symbol}
              {price}
            </h2>
            <p>{currency.abbrev}</p>
          </>
        ) : (
          <h2>{price}</h2>
        )}
      </div>
      {priceCadence && <p className={styles.price_cadence}>{priceCadence}</p>}
    </div>
  );
};

type BasePlanCardPropsT = {
  classProp?: string;
  title: string;
  price: ReactNode;
  infoCopyList: PlanInfoCopyT[];
  form?: ReactNode;
  confirmButton: ReactNode;
  footerClassProp?: string;
};

export const BasePlanCard = ({
  classProp = '',
  title,
  price,
  infoCopyList,
  form,
  confirmButton,
  footerClassProp = '',
}: BasePlanCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.banner_gradient} />
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
        {form}
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
