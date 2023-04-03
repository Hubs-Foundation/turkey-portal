import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import Modal from '@Shared/Modal/Modal';
import ConfirmPlanModel from 'components/Modals/ConfirmPlanModal/ConfirmPlanModel';
import styles from '../dashboard/dashboard.module.scss';

const ConfirmPlan = () => {
  return (
    <div className="page_wrapper">
      <div className={styles.cards_wrapper}>
        <SkeletonCard qty={3} category="row" pulse={false} />
      </div>

      <Modal onClose={() => {}} hasFormatting={false}>
        <ConfirmPlanModel />
      </Modal>
    </div>
  );
};

export default ConfirmPlan;
