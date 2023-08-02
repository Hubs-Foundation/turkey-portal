import { useCallback, useEffect, useState } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import { PROFESSIONAL_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import { getPricePageData } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import { BillingPeriodE, PlansE, pricePageDataT } from 'types/General';
import styles from './BasePlanCard.module.scss';

type ProfessionalPlanCardPropsT = {
  billingPeriod: BillingPeriodE;
};

const ProfessionalPlanCard = ({
  billingPeriod,
}: ProfessionalPlanCardPropsT) => {
  const { regionCode } = useSelector(selectRegion);
  const [pricePageData, setPricePageData] = useState<pricePageDataT>();

  useEffect(() => {
    const getData = () => {
      try {
        getPricePageData(
          regionCode,
          PlansE.PROFESSIONAL,
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
          plan={PlansE.PROFESSIONAL}
          title="Professional (Early Access)"
          color="rainbow"
          price={
            <Price
              price={`${pricePageData.currencySymbol}${pricePageData.planPrice}`}
              billingPeriod={`per ${
                billingPeriod === BillingPeriodE.YEARLY ? 'year' : 'month'
              }`}
            />
          }
          infoCopyList={PROFESSIONAL_COPY}
          showDisclaimer={false}
          additionalContent={
            <div className="flex-align-center my-20">
              <span className={styles.circle}></span>
              <span>Always on — no pausing</span>
            </div>
          }
          confirmButton={
            <Button
              label="Subscribe to hubs"
              text="Get Started"
              onClick={handleSubscribeClick}
            />
          }
        />
      )}
    </>
  );
};

export default ProfessionalPlanCard;
