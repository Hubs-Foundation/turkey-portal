import { ReactNode } from 'react';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import { PlansE } from 'types/General';
import { PlanInfoCopyT } from '../plan.const';
import styles from './BasePlanCard.module.scss';
import InfoBlock from '@Shared/InfoBlock/InfoBlock';
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

const BasePlanCard = ({
  title,
  price,
  infoCopyList,
  additionalContent,
  confirmButton,
  footerClassProp = '',
  isSoldOut = false,
  color,
  classProp = '',
}: BasePlanCardPropsT) => {
  const account = useSelector(selectAccount);
  const showCurrentPlan = (): boolean => {
    let show = false;
    const planName = title.toLocaleLowerCase();

    if (account.planName === planName) show = true;
    // If plan name is legacy "Standard" and card is
    // "Personal" then mark as current plan.
    if (account.planName === PlansE.LEGACY && planName === PlansE.PERSONAL)
      show = true;

    return show;
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
        <div
          className={`${styles.footer} ${footerClassProp} flex-justify-center`}
        >
          {isSoldOut ? (
            <Button label="sold out" text="sold out" />
          ) : showCurrentPlan() ? (
            <span className="body-md-semi-bold">Current Plan*</span>
          ) : (
            confirmButton
          )}
        </div>
      </div>
    </div>
  );
};

export default BasePlanCard;
