import { useEffect, useState } from 'react';
import styles from './Subscribe.module.scss';
import { getRegion } from 'services/region.service';
import { useTabletDown, useMobileDown } from '../../../hooks/useMediaQuery';
import { RegionCodeT } from 'types/Countries';
import { BillingPeriodE, PlansE } from 'types/General';
import { getPricePageData } from 'util/utilities';
import getEnvVariable from 'config';
import { STARTER_COPY, PERSONAL_COPY, PROFESSIONAL_COPY } from './plan.const';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import { Button } from '@mozilla/lilypad-ui';
import Snow from '@Shared/Snow/Snow';
import Bar from '@Shared/Bar/Bar';
import ButtonToggle from '@Shared/ButtonToggle/ButtonToggle';
import { Price, Status, BasePlanCard } from './BasePlanCard/BasePlanCard';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  const [loading, setLoading] = useState(true);
  const [regionCode, setRegionCode] = useState<RegionCodeT>('US');
  const [billingPeriod, setBillingPeriod] = useState(BillingPeriodE.MONTHLY);
  const isTabletDown = useTabletDown();
  const isMobileDown = useMobileDown();
  const BILLING_OPTIONS = [
    { label: 'Monthly', value: BillingPeriodE.MONTHLY },
    { label: 'Yearly', value: BillingPeriodE.YEARLY },
  ];
  const PLAN_QTY = 3;
  /**
   * Init Plans Data
   */

  const personalPlanData = getPricePageData(
    regionCode,
    PlansE.PERSONAL,
    billingPeriod
  );

  const professionalPlanData = getPricePageData(
    regionCode,
    PlansE.PROFESSIONAL,
    billingPeriod
  );

  /**
   * Init Region Data
   */
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data = await getRegion();
        setRegionCode(data.regionCode);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error('error fetching region', e);
      }
    };
    fetchRegion();
  }, []);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <Snow location="top" />
      <div className={styles.container}>
        {/* Subscription Header  */}
        <section className={styles.header}>
          <div className="text-center">
            <div className={styles.bar_wrapper}>
              <Bar />
            </div>
            <h2 className="heading-xxl mb-60">
              Choose the plan that fits your needs
            </h2>
            <ButtonToggle
              classProp="mb-8"
              options={BILLING_OPTIONS}
              onClick={(value: BillingPeriodE) => {
                setBillingPeriod(value);
              }}
            />
          </div>
        </section>

        <section className={styles.cards_wrapper}>
          <div
            className={styles.cards}
            style={isMobileDown ? { minWidth: PLAN_QTY * 304 } : undefined}
          >
            {loading ? (
              <SkeletonCard
                qty={isTabletDown ? 1 : 3}
                category="square"
                classProp={styles.loader}
              />
            ) : (
              <>
                {/* STARTER PLAN  */}
                <BasePlanCard
                  title={STARTER_COPY.title}
                  subtitle={STARTER_COPY.subtitle}
                  color="warm"
                  price={<Price price="Free" billingPeriod="Always" />}
                  valueProps={STARTER_COPY.valueProps}
                  additionalContent={
                    <Status icon="warning" message={STARTER_COPY.status} />
                  }
                  confirmButton={
                    <Button
                      label="Create free hub"
                      text="Get Started"
                      onClick={() => {
                        window.open(
                          getEnvVariable('PUBLIC_API_SERVER') + '/confirm-plan'
                        );
                      }}
                    />
                  }
                />

                {/* PERSONAL PLAN */}
                <BasePlanCard
                  title={PERSONAL_COPY.title}
                  subtitle={PERSONAL_COPY.subtitle}
                  color="cool"
                  price={
                    <Price
                      price={`${personalPlanData.currencySymbol}${personalPlanData.planPrice}`}
                      currencyAbbrev={personalPlanData.currencyAbbrev}
                      billingPeriod={`per ${
                        billingPeriod === BillingPeriodE.YEARLY
                          ? 'year'
                          : 'month'
                      }`}
                    />
                  }
                  valueProps={PERSONAL_COPY.valueProps}
                  features={PERSONAL_COPY.features}
                  additionalContent={
                    <Status icon="warning" message={PERSONAL_COPY.status} />
                  }
                  confirmButton={
                    <Button
                      label="Create Personal hub"
                      text="Get Started"
                      onClick={() => {
                        window.open(personalPlanData.planUrl);
                      }}
                    />
                  }
                />

                {/* PROFESSIONAL PLAN */}
                <BasePlanCard
                  title={PROFESSIONAL_COPY.title}
                  subtitle={PROFESSIONAL_COPY.subtitle}
                  color="rainbow"
                  price={
                    <Price
                      price={`${professionalPlanData.currencySymbol}${professionalPlanData.planPrice}`}
                      currencyAbbrev={personalPlanData.currencyAbbrev}
                      billingPeriod={`per ${
                        billingPeriod === BillingPeriodE.YEARLY
                          ? 'year'
                          : 'month'
                      }`}
                    />
                  }
                  valueProps={PROFESSIONAL_COPY.valueProps}
                  features={PROFESSIONAL_COPY.features}
                  additionalContent={
                    <Status
                      icon="greenLight"
                      message={PROFESSIONAL_COPY.status}
                    />
                  }
                  confirmButton={
                    <Button
                      label="Create Professional hub"
                      text="Get Started"
                      onClick={() => {
                        window.open(professionalPlanData.planUrl);
                      }}
                    />
                  }
                />
              </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Subscribe;
