import { ReactNode } from 'react';
import { Icon } from '@mozilla/lilypad-ui';
import { PlanInfoCopyT } from './PlanInfoCopy';
import styles from './PlanInfoCard.module.scss';
import { RegionsT } from 'types/Countries';
import { getCurrencyMeta } from 'util/utilities';

// INFO BLOCK COMPONENT
const InfoBlock = ({ icon, label, description }: PlanInfoCopyT) => {
  return (
    <div className={styles.info_wrapper}>
      <div className="flex-box">
        <Icon name={icon} size={30} classProp="mr-20" />
      </div>
      <div className="body-md">
        <p>
          {' '}
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
      {priceCadence && <p className={styles.price_cadence}>per month + tax</p>}
    </div>
  );
};

type PlanInfoCardPropsT = {
  classProp?: string;
  title: string;
  price: ReactNode;
  infoCopyList: PlanInfoCopyT[];
  form?: ReactNode;
  confirmButton: ReactNode;
  footerClassProp?: string;
};

export const PlanInfoCard = ({
  classProp = '',
  title,
  price,
  infoCopyList,
  form,
  confirmButton,
  footerClassProp = '',
}: PlanInfoCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.banner_gradient} />
      <div className={`${styles.content_wrapper}`}>
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

        {/* FOOTER  */}
        <div className={styles.footer_wrapper}>
          <div className={`${styles.footer} ${footerClassProp}`}>
            {confirmButton}
          </div>
        </div>
      </div>
    </div>
  );
};
