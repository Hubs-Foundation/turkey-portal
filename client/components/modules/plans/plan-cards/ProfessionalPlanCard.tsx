import { useCallback } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import { PROFESSIONAL_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriodE, PlansE } from 'types/General';
import styles from './BasePlanCard.module.scss';

type ProfessionalPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
};

const ProfessionalPlanCard = ({
  billingPeriod,
}: ProfessionalPlanCardPropsT) => {
  const { regionCode } = useSelector(selectRegion);
  const { planPrice, planUrl, taxDescription, currencySymbol } =
    getPricePageData(regionCode, PlansE.PROFESSIONAL, billingPeriod);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    window.open(planUrl);
  }, [planUrl]);

  return (
    <BasePlanCard
      plan={PlansE.PROFESSIONAL}
      title="Professional"
      color="rainbow"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          billingPeriod={`per ${
            billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
          }`}
        />
      }
      infoCopyList={PROFESSIONAL_COPY}
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

export default ProfessionalPlanCard;
