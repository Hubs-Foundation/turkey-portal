import { STARTER_COPY } from '../Plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';

const StarterPlanCard = () => {
  return (
    <BasePlanCard
      isSoldOut={true}
      title="Starter"
      color="silver"
      price={<Price price="Free" />}
      infoCopyList={STARTER_COPY}
      confirmButton={<BeginStarterPlanButton text="Create free hub" />}
    />
  );
};

export default StarterPlanCard;
