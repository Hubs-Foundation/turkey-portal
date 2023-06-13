import { useEffect, useState } from 'react';
import { RegionCodeT } from 'types/Countries';
import StandardPlanCard from './StandardPlanCard/StandardPlanCard';
import StarterPlanCard from './StarterPlanCard/StarterPlanCard';
import BusinessPlanCard from './BusinessPlanCard/BusinessPlanCard';
import styles from './Subscribe.module.scss';
import Swoosh from '@Shared/Swoosh/Swoosh';
import { getRegion } from 'services/region.service';
import { BillingPeriod } from 'types/Countries';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  const [regionCode, setRegionCode] = useState<RegionCodeT>('US');
  // TODO - set toggle to set yearly and monthly cards.
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data = await getRegion();
        setRegionCode(data.regionCode);
      } catch (e) {
        console.error('error fetching region', e);
      }
    };
    fetchRegion();
  }, []);

  const onPeriodChange = () => {
    setBillingPeriod((state) => {
      if (state === 'monthly') {
        return 'yearly';
      }
      return 'monthly';
    });
  };

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <>
        <Swoosh location="top" />
        <div className={styles.container}>
          <button
            onClick={() => {
              onPeriodChange();
            }}
          >
            click me!!!
          </button>
          <div className={styles.cards}>
            <StarterPlanCard />
            <StandardPlanCard
              regionCode={regionCode}
              billingPeriod={billingPeriod}
            />
            <BusinessPlanCard />
          </div>
        </div>
        <Swoosh location="bottom" />
      </>
    </section>
  );
};

export default Subscribe;
