import { useCallback } from 'react';
import { Button, Icon } from '@mozilla/lilypad-ui';
import { PERSONAL_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriodE, PlansE } from 'types/General';

type PersonalPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
};

const PersonalPlanCard = ({ billingPeriod }: PersonalPlanCardPropsT) => {
  const { regionCode } = useSelector(selectRegion);
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
      plan={PlansE.PERSONAL}
      title="Personal"
      color="warm"
      price={
        <Price
          price={`${currencySymbol}${planPrice}`}
          billingPeriod={`per ${
            billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
          }`}
        />
      }
      infoCopyList={PERSONAL_COPY}
      showDisclaimer={false}
      additionalContent={
        <div className="flex-align-center my-20">
          <div>
            <Icon name="alert-triangle" classProp="mr-25 ml-3" />
          </div>
          <span className="body-md">
            Auto pause after 72 hours of inactivity
          </span>
        </div>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Get started"
          onClick={handleSubscribeClick}
        />
      }
    />
  );
};

export default PersonalPlanCard;
