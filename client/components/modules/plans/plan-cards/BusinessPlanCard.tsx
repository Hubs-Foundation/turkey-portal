import { useCallback } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import { BUSINESS_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriodE, PlansE } from 'types/General';
import styles from './BasePlanCard.module.scss';

type BusinessPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
};

const BusinessPlanCard = ({ billingPeriod }: BusinessPlanCardPropsT) => {
  const { regionCode } = useSelector(selectRegion);
  const { planPrice, planUrl, taxDescription, currencySymbol, currencyAbbrev } =
    getPricePageData(regionCode, PlansE.BUSINESS, billingPeriod);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    window.open(planUrl);
  }, [planUrl]);

  return (
    <BasePlanCard
      plan={PlansE.BUSINESS}
      title="Professional"
      color="rainbow"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          currencyAbbrev={currencyAbbrev}
          billingPeriod={`per ${
            billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
          }`}
        />
      }
      infoCopyList={BUSINESS_COPY}
      showDisclaimer={false}
      additionalContent={
        <div className="flex-align-center my-20">
          <span className={styles.circle}></span>
          <span>Always on — no pausing</span>
        </div>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Get Started"
          onClick={handleSubscribeClick}
        />
      }
    />
  );
};

export default BusinessPlanCard;
