import { useCallback, useState } from 'react';
import { Button, Checkbox } from '@mozilla/lilypad-ui';
import { StandardPlanInfoCopy } from '../PlanInfoCopy';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriod } from 'types/Countries';

type StandardPlanCardPropsT = {
  billingPeriod: BillingPeriod;
};

const StandardPlanCard = ({ billingPeriod }: StandardPlanCardPropsT) => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
  const { regionCode } = useSelector(selectRegion);
  const { planPrice, planUrl, taxDescription, currencySymbol } =
    getPricePageData(regionCode, 'standard', 'monthly');

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    window.open(planUrl);
  }, [planUrl]);

  const onToggleLocationConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
  }, []);

  return (
    <BasePlanCard
      title={'Early Access Hub'}
      color="warm"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          billingPeriod={`per ${
            billingPeriod === 'yearly' ? 'year' : 'month'
          } ${taxDescription}`}
        />
      }
      infoCopyList={StandardPlanInfoCopy}
      form={
        <form className="content-box mt-16 mb-16">
          <Checkbox
            classProp="content-box"
            onChange={onToggleLocationConfirmation}
            checked={locationConfirmed}
            label="I'm located in UK, Canada, USA, or Germany"
          />
        </form>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Subscribe now"
          onClick={handleSubscribeClick}
          disabled={!locationConfirmed}
        />
      }
    />
  );
};

export default StandardPlanCard;
