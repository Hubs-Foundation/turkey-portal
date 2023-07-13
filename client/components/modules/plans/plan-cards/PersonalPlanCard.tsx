import { useCallback, useState, useEffect } from 'react';
import { Button, Icon } from '@mozilla/lilypad-ui';
import { PERSONAL_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriodE, PlansE, pricePageDataT } from 'types/General';

type PersonalPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
};

const PersonalPlanCard = ({ billingPeriod }: PersonalPlanCardPropsT) => {
  const { regionCode } = useSelector(selectRegion);
  const [pricePageData, setPricePageData] = useState<pricePageDataT>();

  useEffect(() => {
    const getData = () => {
      try {
        getPricePageData(
          regionCode,
          PlansE.PERSONAL,
          BillingPeriodE.MONTHLY
        ).then((response) => {
          setPricePageData(response);
        });
      } catch (error) {}
    };

    getData();
  }, []);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    if (!pricePageData) return;
    window.open(pricePageData.planUrl);
  }, [pricePageData]);

  return (
    <>
      {pricePageData && (
        <BasePlanCard
          title="Personal"
          color="warm"
          price={
            <Price
              price={`${pricePageData.currencySymbol}${pricePageData.planPrice}`}
              billingPeriod={`per ${
                billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
              } + tax`}
            />
          }
          infoCopyList={PERSONAL_COPY}
          additionalContent={
            <a
              className="primary-link"
              href="https://hubs.mozilla.com/docs/setup-choosing.html#supported-regions-and-currencies"
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
              text="Subscribe now"
              onClick={handleSubscribeClick}
            />
          }
        />
      )}
    </>
  );
};

export default PersonalPlanCard;
