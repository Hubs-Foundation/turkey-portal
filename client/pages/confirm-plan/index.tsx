import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import ConfirmPlanModel from 'components/Modals/ConfirmPlanModal/ConfirmPlanModel';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { pageRequireAuthentication } from 'services/routeGuard.service';
import styles from '../dashboard/dashboard.module.scss';
import { enabledStarterPlan } from 'util/featureFlag';
import { redirectToDashboard } from 'util/redirects';
import { useEffect } from 'react';

const ConfirmPlan = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  return (
    <div className="page_wrapper">
      <div className={styles.cards_wrapper}>
        <SkeletonCard qty={2} category="square" pulse={false} />
        <SkeletonCard qty={1} category="row" pulse={false} />
      </div>

      <ConfirmPlanModel />
    </div>
  );
};

export default ConfirmPlan;

export const getServerSideProps = pageRequireAuthentication(
  async (context: GetServerSidePropsContext) => {
    if (!enabledStarterPlan()) return redirectToDashboard();
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
