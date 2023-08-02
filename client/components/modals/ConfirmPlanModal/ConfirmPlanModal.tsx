import { Button, Modal } from '@mozilla/lilypad-ui';
import InfoBlock from '@Shared/InfoBlock/InfoBlock';
import { PERSONAL_COPY } from 'components/modules/plans/plan.const';
import styles from './ConfirmPlanModal.module.scss';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';
import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';
import { RoutesE } from 'types/Routes';

const ConfirmPlanModal = () => {
  const { regionCode } = useSelector(selectRegion);

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
              text="Continue with Starter Plan"
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
              category="secondary_solid"
              text="Upgrade Plan"
              label="Upgrade Plan"
              href={RoutesE.SUBSCRIBE}
            />
          </div>
          <div className={`${styles.info_wrapper}`}>
            {PERSONAL_COPY.map(({ icon, label }, i) => (
              <InfoBlock key={i} icon={icon} label={label} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPlanModal;
