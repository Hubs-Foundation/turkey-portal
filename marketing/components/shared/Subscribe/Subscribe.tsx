import { useEffect, useState } from 'react';
import { RegionCodeT } from 'types/Countries';
import PersonalPlanCard from './PersonalPlanCard/PersonalPlanCard';
import StarterPlanCard from './StarterPlanCard/StarterPlanCard';
import BusinessPlanCard from './BusinessPlanCard/BusinessPlanCard';
import ProfessionalPlanCard from './ProfessionalPlanCard/ProfessionalPlanCard';
import styles from './Subscribe.module.scss';
import Snow from '@Shared/Snow/Snow';
import { getRegion } from 'services/region.service';
import { BillingPeriodE } from 'types/General';
import Bar from '@Shared/Bar/Bar';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  const [regionCode, setRegionCode] = useState<RegionCodeT>('US');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriodE>(
    BillingPeriodE.MONTHLY
  );

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data = await getRegion();
        console.log('Region Header: ', data.regionCode);
        setRegionCode(data.regionCode);
      } catch (e) {
        console.error('error fetching region', e);
      }
    };
    fetchRegion();
  }, []);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <Snow location="top" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <Bar />
            <h2 className="heading-xxl">
              Choose the plan that fits your needs
            </h2>
          </div>
        </div>
        <div className={styles.cards}>
          <StarterPlanCard />
          <PersonalPlanCard
            regionCode={regionCode}
            billingPeriod={billingPeriod}
          />
          <ProfessionalPlanCard
            regionCode={regionCode}
            billingPeriod={billingPeriod}
          />
          <BusinessPlanCard />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
