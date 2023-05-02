import { StarterPlanInfoCopy } from './PlanInfoCopy';
import { Price, BasePlanCard } from './BasePlanCard';
import { BeginStarterPlanButton } from '@Shared/Buttons/BeginStarterPlanButton';

export const StarterPlanCard = () => {
  return (
    <BasePlanCard
      title="Starter"
      color="silver"
      price={<Price region={null} price="Free" />}
      infoCopyList={StarterPlanInfoCopy}
      confirmButton={<BeginStarterPlanButton text="Create free hub" />}
    />
  );
};
