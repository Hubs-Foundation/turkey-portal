import { useCallback } from 'react';
import { Button, ToolTip, Icon } from '@mozilla/lilypad-ui';
import { PERSONAL_COPY } from '../Plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriodE, PlansE } from 'types/General';

type StandardPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
};

const StandardPlanCard = ({ billingPeriod }: StandardPlanCardPropsT) => {
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
      title="Early Access Hub"
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
          text="Subscribe now"
          onClick={handleSubscribeClick}
        />
      }
    />
  );
};

export default StandardPlanCard;
