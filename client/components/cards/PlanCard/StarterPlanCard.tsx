import { Button } from '@mozilla/lilypad-ui';
import { StarterPlanInfoCopy } from './PlanInfoCopy';
import { Price, BasePlanCard } from './BasePlanCard';

const noop = () => {};

export const StarterInfoCard = () => {
  return (
    <BasePlanCard
      title="Starter"
      price={<Price region={null} price="Free" />}
      infoCopyList={StarterPlanInfoCopy}
      confirmButton={
        <Button label="Create free hub" text="Create free hub" onClick={noop} />
      }
    />
  );
};
