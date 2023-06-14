import { StarterPlanInfoCopy } from '../PlanInfoCopy';
import BasePlanCard, { Price } from './BasePlanCard';
import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';

const StarterPlanCard = () => {
  return (
    <BasePlanCard
      title="Starter"
      color="silver"
      price={<Price price="Free" />}
      infoCopyList={StarterPlanInfoCopy}
      confirmButton={<BeginStarterPlanButton text="Create free hub" />}
    />
  );
};

export default StarterPlanCard;
