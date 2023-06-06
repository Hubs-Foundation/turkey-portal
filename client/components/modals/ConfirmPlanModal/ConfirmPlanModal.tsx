import { Button, ButtonCategoriesE, Modal } from '@mozilla/lilypad-ui';
import InfoBlock, { InfoBlockPropsT } from '@Shared/InfoBlock/InfoBlock';
import { StandardPlanInfoCopy } from '@Modules/plans/PlanInfoCopy';
import styles from './ConfirmPlanModal.module.scss';

import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';

const createInfoBlock = ({ label, icon }: InfoBlockPropsT, i: number) => {
  return <InfoBlock key={i} icon={icon} label={label} />;
};

const ConfirmPlanModal = () => {
  return (
    <Modal onClose={() => {}} hasContainer={false} isVisible={true}>
      <div className={styles.contents}>
        <div className={`${styles.container} ${styles.continue_wrapper} mb-10`}>
          <h2 className="heading-lg mb-32">Let&apos;s build your hub!</h2>
          <p className="body-md mb-42">
            Continue with a Starter Plan and begin exploration the many features
            of your hub. Visit your hub’s home page and create your first
            virtual room.
          </p>
          <div className="flex-justify-center">
            <BeginStarterPlanButton
              text="Continue with Starter"
              classProp={styles.button}
            />
          </div>
        </div>

        <div className={`${styles.container} mb-10`}>
          <div className={`${styles.gradient_banner} flex py-15 px-16`}>
            <p className="heading-xxs">
              Looking to take your online communities to the next level?
            </p>
            <Button
              category={ButtonCategoriesE.SECONDARY_SOLID}
              text="Upgrade to Standard"
              label="Upgrade to Standard"
            />
          </div>
          <div className={`${styles.info_wrapper} flex`}>
            <div className={`${styles.first}`}>
              {StandardPlanInfoCopy.slice(0, 2).map(createInfoBlock)}
            </div>
            <div>{StandardPlanInfoCopy.slice(2, 4).map(createInfoBlock)}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPlanModal;
