import { useCallback } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import { PROFESSIONAL_COPY } from '../plan.const';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { BillingPeriodE, PlansE } from 'types/General';
import { RegionCodeT } from 'types/Countries';
import styles from '../BasePlanCard/BasePlanCard.module.scss';

type ProfessionalPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
  regionCode: RegionCodeT;
};

const ProfessionalPlanCard = ({
  billingPeriod,
  regionCode,
}: ProfessionalPlanCardPropsT) => {
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
