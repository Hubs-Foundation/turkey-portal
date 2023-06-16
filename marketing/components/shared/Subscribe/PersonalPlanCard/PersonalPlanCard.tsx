import { useCallback, useState } from 'react';
import { RegionCodeT, BillingPeriod } from 'types/Countries';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { PersonalPlanInfoCopy } from '../BasePlanCard/planInfoCopy';
import { Button, Checkbox } from '@mozilla/lilypad-ui';
import { getPricePageData } from 'util/utilities';

type PersonalPlanCardPropsT = {
  billingPeriod: BillingPeriod;
  regionCode: RegionCodeT;
};

const PersonalPlanCard = ({
  billingPeriod,
  regionCode,
}: PersonalPlanCardPropsT) => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
  const { planPrice, planUrl, taxDescription, currencySymbol } =
    getPricePageData(regionCode, 'personal', billingPeriod);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    window.open(planUrl);
  }, [planUrl]);

  const onToggleConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
  }, []);

  return (
    <BasePlanCard
      title="Early Access Hub"
      color="warm"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          billingPeriod={`per ${
            billingPeriod === 'yearly' ? 'year' : 'month'
          } ${taxDescription}`}
        />
      }
      infoCopyList={PersonalPlanInfoCopy}
      form={
        <form className="content-box mt-16 mb-16">
          <Checkbox
            classProp="content-box"
            onChange={onToggleConfirmation}
            checked={locationConfirmed}
            label="I'm located in UK, Canada, USA, or Germany"
          />
        </form>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Subscribe"
          onClick={handleSubscribeClick}
          disabled={!locationConfirmed}
        />
      }
    />
  );
};

export default PersonalPlanCard;
