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
    getPricePageData(regionCode, PlansE.PERSONAL, BillingPeriodE.MONTHLY);

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
            billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
          } ${taxDescription}`}
        />
      }
      infoCopyList={PERSONAL_COPY}
      additionalContent={
        <a
          className="primary-link"
          href="https://hubs.mozilla.com/docs/setup-choosing.html#supported-regions-and-currencies"
          target="_blank"
        >
          <div className="flex pt-24 mb-16">
            <div className="color-interaction-primary">
              <Icon name="info" classProp="mr-16" color="currentColor" />
            </div>

            <p className="paragraph-sm">
              Paid subscription plans are available in select countries
            </p>
          </div>
        </a>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Subscribe now"
          onClick={handleSubscribeClick}
        />
      }
    />
  );
};

export default PersonalPlanCard;
