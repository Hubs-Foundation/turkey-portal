import { Button } from '@mozilla/lilypad-ui';
import { StarterPlanInfoCopy } from './PlanInfoCopy';
import { Price, BasePlanCard } from './BasePlanCard';

// TODO change noop to a button click
const noop = () => {};

export const StarterPlanCard = () => {
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
