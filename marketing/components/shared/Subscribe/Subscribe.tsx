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
import { Modal, Button } from '@mozilla/lilypad-ui';
import Snow from '@Shared/Snow/Snow';
import Bar from '@Shared/Bar/Bar';
import ButtonToggle from '@Shared/ButtonToggle/ButtonToggle';
import ContactFormModal from 'components/modals/ContactFormModal/ContactFormModal';
import { Price, Status, BasePlanCard } from './BasePlanCard/BasePlanCard';

type SubscribePropsT = {
  classProp?: string;
};

const Subscribe = ({ classProp = '' }: SubscribePropsT) => {
  const [loading, setLoading] = useState(true);
  const [regionCode, setRegionCode] = useState<RegionCodeT>('US');
  const [billingPeriod, setBillingPeriod] = useState(BillingPeriodE.MONTHLY);
  const [showModal, setShowModal] = useState<Boolean>(false);
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

  const loadingCards = isTabletDown ? [1] : [1, 2, 3];

  /**
   * Init Region Data
   */
  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data = await getRegion();
        setRegionCode(data.regionCode);
      } catch (e) {
        console.error('error fetching region', e);
      } finally {
        setLoading(false);
      }
    };
    fetchRegion();
  }, []);

  /**
   * Close Modal
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Open Modal
   */
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const HangerCard = () => (
    <div className={styles.hanger_card}>
      <div className={styles.banner_gradient}></div>
      <button
        className={styles.hanger_cta}
        aria-label="click here to open contact form"
        type="button"
        onClick={handleOpenModal}
      >
        Click here
      </button>
      <p className="body-md">for enterprise inquiries</p>
    </div>
  );

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
            <ButtonToggle<BillingPeriodE>
              classProp="mb-8"
              options={BILLING_OPTIONS}
              onClick={(value: BillingPeriodE) => {
                setBillingPeriod(value);
              }}
            />
          </div>
        </section>

        {loading && (
          <section className={styles.loader_wrapper}>
            <div className={styles.loader_container}>
              {loadingCards.map((i) => (
                <SkeletonCard
                  key={i}
                  qty={1}
                  category="square"
                  classProp={styles.loader}
                />
              ))}
            </div>
          </section>
        )}

        <section className={styles.cards_wrapper}>
          <div
            className={styles.cards}
            style={isMobileDown ? { minWidth: PLAN_QTY * 304 } : undefined}
          >
            {!loading && (
              <>
                {/* STARTER PLAN  */}
                <BasePlanCard
                  classProp={styles.plan_1}
                  title={STARTER_COPY.title}
                  subtitle={STARTER_COPY.subtitle}
                  color="warm"
                  price={<Price price="Free" />}
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
                  classProp={styles.plan_2}
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
                  classProp={styles.plan_3}
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

                {/* BUSINESS INQU*/}
                {!isMobileDown && <HangerCard />}
              </>
            )}
          </div>
        </section>
        {/* BUSINESS INQU*/}
        {isMobileDown && <HangerCard />}
      </div>

      <Modal onClose={handleCloseModal} isVisible={showModal}>
        <ContactFormModal onClose={handleCloseModal} />
      </Modal>
    </section>
  );
};

export default Subscribe;
