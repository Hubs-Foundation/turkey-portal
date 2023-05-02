import { ReactNode } from 'react';
import { HubIcon, HubIconT } from '@mozilla/lilypad-ui';
import styles from './BasePlanCard.module.scss';
import { RegionsT } from 'types';
import { getCurrencyMeta } from 'util/utilities';
import { PlanInfoCopyT } from './planInfoCopy';

type InfoBlockPropsT = {
  icon: HubIconT;
  label: string;
  description: string;
};

// INFO BLOCK COMPONENT
const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <div className="flex-box">
        <HubIcon name={icon} size={30} classProp="mr-20 mt-2 " />
      </div>
      <div className="body-md">
        <p>
          <span className="body-md-bold">{label}</span> <br /> {description}
        </p>
      </div>
    </div>
  );
};

// PRICE DISPLAY COMPONENT
type PricePropsT = {
  region: RegionsT | null;
  price: string;
  priceCadence?: string;
};

export const Price = ({ region, price, priceCadence }: PricePropsT) => {
  const currency = region ? getCurrencyMeta(region) : null;

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
};

export const BasePlanCard = ({
  classProp = '',
  title,
  price,
  infoCopyList,
  form,
  confirmButton,
  footerClassProp = '',
  color,
}: BasePlanCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
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
          {confirmButton}
        </div>
      </div>
    </div>
  );
};
