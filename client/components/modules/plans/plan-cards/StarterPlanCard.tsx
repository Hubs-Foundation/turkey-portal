import { starterPlanInfoCopy } from '../PlanInfoCopy';
import BasePlanCard, { Price } from './BasePlanCard';
import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';

const StarterPlanCard = () => {
  return (
    <BasePlanCard
      title="Starter"
      color="silver"
      price={<Price price="Free" />}
      infoCopyList={starterPlanInfoCopy}
      confirmButton={<BeginStarterPlanButton text="Create free hub" />}
    />
  );
};

export default StarterPlanCard;
