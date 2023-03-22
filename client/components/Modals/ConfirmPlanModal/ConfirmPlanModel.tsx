import { Button } from '@mozilla/lilypad-ui';
import { InfoBlock, InfoBlockPropsT } from '@Shared/InfoBlock/InfoBlock';
import SubscriptionInfoCopy from '@Cards/SubInfoCard/SubscriptionInfoCopy';
import styles from './ConfirmPlanModal.module.scss';

const createInfoBlock = (
  { label, description, icon }: InfoBlockPropsT,
  i: number
) => {
  return (
    <InfoBlock key={i} icon={icon} label={label} description={description} />
  );
};

const ConfirmPlanModel = () => {
  return (
    <div className="p-20" style={{ backgroundColor: 'grey' }}>
      <div className={`${styles.wrapper} mb-10 p-20`}>
        <h2>Let&apos;s make your first hub!</h2>
        <p>
          Continue with starter plan to begin managing and exploring your
          virtual worlds
        </p>
        <Button
          classProp={styles.button}
          text="Continue with Starter"
          label="Continue with Starter"
        />
      </div>

      <div className={`${styles.wrapper} mb-10`}>
        <div className={`${styles.gradient} py-15 px-10`}>
          <p>Looking to take your online communities to the next level?</p>
          <Button
            classProp=""
            text="Upgrade to Standard"
            label="Upgrade to Standard"
          />
        </div>
        <div className="">
          <div>{SubscriptionInfoCopy.slice(0, 2).map(createInfoBlock)}</div>
          <div>{SubscriptionInfoCopy.slice(2, 4).map(createInfoBlock)}</div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPlanModel;
