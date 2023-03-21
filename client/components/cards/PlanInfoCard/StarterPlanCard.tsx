import { Button } from '@mozilla/lilypad-ui';
import { StarterPlanInfoCopy } from './PlanInfoCopy';
import { Price, PlanInfoCard } from './PlanInfoCard';
import styles from './PlanInfoCard.module.scss';

const noop = () => {};

export const StarterInfoCard = () => {
  return (
    <PlanInfoCard
      classProp={styles.wrapper_starter}
      title="Starter"
      price={<Price region={null} price="Free" />}
      infoCopyList={StarterPlanInfoCopy}
      confirmButton={
        <Button label="Create free hub" text="Create free hub" onClick={noop} />
      }
      footerClassProp={styles.footer_starter}
    />
  );
};
