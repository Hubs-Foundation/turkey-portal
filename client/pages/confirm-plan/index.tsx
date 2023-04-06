import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import ConfirmPlanModel from 'components/Modals/ConfirmPlanModal/ConfirmPlanModel';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { pageRequireAuthentication } from 'services/routeGuard.service';
import styles from '../dashboard/dashboard.module.scss';
import { enabledStarterPlan } from 'util/featureFlag';
import { redirectToDashboard } from 'util/redirects';

const ConfirmPlan = () => {
  return (
    <div className="page_wrapper">
      <div className={styles.cards_wrapper}>
        <SkeletonCard qty={3} category="row" pulse={false} />
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
