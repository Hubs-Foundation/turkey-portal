import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import { GetServerSidePropsContext } from 'next';
import { confirmPlanRG } from 'services/routeGuard.service';
import styles from './confirm-plan.module.scss';
import { useEffect } from 'react';
import ConfirmPlanModal from '@Modals/ConfirmPlanModal/ConfirmPlanModal';

const ConfirmPlan = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  return (
    <div className="page_wrapper">
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <SkeletonCard qty={2} category="square" pulse={false} />
          <SkeletonCard
            qty={1}
            category="row"
            pulse={false}
            classProp={styles.card}
          />
        </div>
      </div>

      <ConfirmPlanModal />
    </div>
  );
};

export default ConfirmPlan;

export const getServerSideProps = confirmPlanRG(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
