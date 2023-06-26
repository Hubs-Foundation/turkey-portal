import { useCallback } from 'react';
import { RegionCodeT } from 'types/Countries';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { PERSONAL_COPY } from '../plan.const';
import { Button, Icon, ToolTip } from '@mozilla/lilypad-ui';
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
      title="Personal Hub"
      color="warm"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          billingPeriod={`per ${
            billingPeriod === 'yearly' ? 'year' : 'month'
          } ${taxDescription}`}
        />
      }
      infoCopyList={PERSONAL_COPY}
      additionalContent={
        <ToolTip description="Available countries include UK, Canada, USA, Germany, Italy, New Zealand, ETC ETC ETC">
          <div className="flex pt-24 mb-16">
            <div className="color-interaction-primary">
              <Icon name="info" classProp="mr-16" color="currentColor" />
            </div>

            <p className="paragraph-sm">
              Hubs is currently available in select countries
            </p>
          </div>
        </ToolTip>
      }
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
