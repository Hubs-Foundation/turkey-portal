import { ReactNode } from 'react';
import styles from './BasePlanCard.module.scss';
import { RegionCodeT } from 'types/Countries';
import { getCurrencyMeta } from 'util/utilities';
import { PlanInfoCopyT } from './planInfoCopy';
import InfoBlock from '../InfoBlock/InfoBlock';
import { Button } from '@mozilla/lilypad-ui';

// PRICE DISPLAY COMPONENT
// USED FOR BasePlanCard "PRICE" PROP
type PricePropsT = {
  regionCode: RegionCodeT;
  price: string;
  priceCadence?: string;
};

export const Price = ({ regionCode, price, priceCadence }: PricePropsT) => {
  const currency = regionCode ? getCurrencyMeta(regionCode) : null;

  return (
    <div className={`${styles.price_container}`}>
      <div className={styles.price}>
        {currency ? (
          <>
            <h2 className="heading-lg">
              {currency.symbol}
              {price}
            </h2>
            <p>{currency.abbrev}</p>
          </>
        ) : (
          <h2 className="heading-lg">{price}</h2>
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
  color: 'silver' | 'warm';
  isSoldOut?: boolean;
};

export const BasePlanCard = ({
  title,
  price,
  infoCopyList,
  form,
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

          {/* LOCATION CONFIRMATION  */}
          {form}
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
