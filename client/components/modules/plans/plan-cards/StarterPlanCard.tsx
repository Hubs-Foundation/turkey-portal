import { STARTER_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';

const StarterPlanCard = () => {
  return (
    <BasePlanCard
      title="Starter"
      color="silver"
      price={<Price price="Free" />}
      infoCopyList={STARTER_COPY}
      confirmButton={<BeginStarterPlanButton text="Create free hub" />}
    />
  );
};

export default StarterPlanCard;
