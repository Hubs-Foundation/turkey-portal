import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import Modal from '@Shared/Modal/Modal';
import ConfirmPlanModel from 'components/Modals/ConfirmPlanModal/ConfirmPlanModel';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { pageRequireAuthentication } from 'services/routeGuard.service';
import styles from '../dashboard/dashboard.module.scss';
import { ENABLE_STARTER_PLAN } from 'config';

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

const starterPlanEnabledCheck = async (cb: Function) => {
  if (ENABLE_STARTER_PLAN === 'true') return cb();
  else return { notFound: true };
};

export const getServerSideProps = starterPlanEnabledCheck(
  pageRequireAuthentication(async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  })
);
