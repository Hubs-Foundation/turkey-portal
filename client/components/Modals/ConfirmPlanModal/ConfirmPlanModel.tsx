import { Button } from '@mozilla/lilypad-ui';
import { InfoBlock, InfoBlockPropsT } from '@Shared/InfoBlock/InfoBlock';
import SubscriptionInfoCopy from '@Cards/SubInfoCard/SubscriptionInfoCopy';
import styles from './ConfirmPlanModal.module.scss';

const createInfoBlock = (
  { label, description, icon }: InfoBlockPropsT,
  i: number
) => {
  return <InfoBlock key={i} icon={icon} label={label} />;
};

const ConfirmPlanModel = () => {
  return (
    <div className={`${styles.modal_wrapper}`}>
      <div className={`${styles.modal_container}`}>
        <div className={styles.contents}>
          <div
            className={`${styles.container} ${styles.continue_wrapper} flex mb-10 p-20`}
          >
            <h2>Let&apos;s build your hub!</h2>
            <p>
              Continue with a Starter Plan and begin exploration the many
              features of your hub. Visit your hub’s home page and create your
              first virtual room.
            </p>
            <Button
              classProp={styles.button}
              text="Continue with Starter"
              label="Continue with Starter"
            />
          </div>

          <div className={`${styles.container} mb-10`}>
            <div className={`${styles.gradient_banner} flex py-15 px-10`}>
              <p>Looking to take your online communities to the next level?</p>
              <Button
                classProp={`${styles.gradient_banner_button}`}
                text="Upgrade to Standard"
                label="Upgrade to Standard"
              />
            </div>
            <div className={`${styles.info_wrapper} flex`}>
              <div>{SubscriptionInfoCopy.slice(0, 2).map(createInfoBlock)}</div>
              <div>{SubscriptionInfoCopy.slice(2, 4).map(createInfoBlock)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPlanModel;
