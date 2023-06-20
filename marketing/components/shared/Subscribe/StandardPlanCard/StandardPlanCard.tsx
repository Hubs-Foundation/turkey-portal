import { useCallback, useState } from 'react';
import { RegionCodeT, BillingPeriod } from 'types/Countries';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { personalPlanInfoCopy } from '../BasePlanCard/planInfoCopy';
import { Button, Icon, ToolTip } from '@mozilla/lilypad-ui';
import { getPricePageData } from 'util/utilities';

type StandardPlanCardPropsT = {
  billingPeriod: BillingPeriod;
  regionCode: RegionCodeT;
};

const StandardPlanCard = ({
  billingPeriod,
  regionCode,
}: StandardPlanCardPropsT) => {
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

  /**
   * Keep this checkbox for now
   */
  // <Checkbox
  //   classProp="content-box"
  //   onChange={onToggleConfirmation}
  //   checked={locationConfirmed}
  //   label="I'm located in UK, Canada, USA, or Germany"
  // />;

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
      infoCopyList={personalPlanInfoCopy}
      form={
        <form className="content-box ">
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
        </form>
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

export default StandardPlanCard;
