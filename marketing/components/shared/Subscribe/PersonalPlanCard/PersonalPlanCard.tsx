import { useCallback } from 'react';
import { RegionCodeT } from 'types/Countries';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { PERSONAL_COPY } from '../plan.const';
import { Button } from '@mozilla/lilypad-ui';
import { getPricePageData } from 'util/utilities';
import { BillingPeriodE, PlansE } from 'types/General';

type PersonalPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
  regionCode: RegionCodeT;
};

const PersonalPlanCard = ({
  billingPeriod,
  regionCode,
}: PersonalPlanCardPropsT) => {
  const { planPrice, planUrl, taxDescription, currencySymbol } =
    getPricePageData(regionCode, PlansE.PERSONAL, billingPeriod);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    window.open(planUrl);
  }, [planUrl]);

  return (
    <BasePlanCard
      title="Personal"
      color="warm"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          billingPeriod={`per ${
            billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
          } + tax`}
        />
      }
      infoCopyList={PERSONAL_COPY}
      showDisclaimer={true}
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Subscribe"
          onClick={handleSubscribeClick}
        />
      }
    />
  );
};

export default PersonalPlanCard;
