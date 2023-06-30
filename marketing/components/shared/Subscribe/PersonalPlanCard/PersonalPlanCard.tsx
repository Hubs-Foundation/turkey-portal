import { useCallback } from 'react';
import { RegionCodeT } from 'types/Countries';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { PERSONAL_COPY } from '../plan.const';
import { Button, Icon } from '@mozilla/lilypad-ui';
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
    console.log('This plan is temporarily disabled');
    /* window.open(planUrl); */
  }, [planUrl]);

  return (
    <BasePlanCard
      isSoldOut={true}
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
      additionalContent={
        <a
          className="primary-link"
          href="/docs/setup-choosing.html#supported-regions-and-currencies"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex pt-24 mb-16">
            <div className="color-interaction-primary">
              <Icon name="info" classProp="mr-16" color="currentColor" />
            </div>

            <p className="paragraph-sm">
              Hubs is currently available in select countries
            </p>
          </div>
        </a>
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
