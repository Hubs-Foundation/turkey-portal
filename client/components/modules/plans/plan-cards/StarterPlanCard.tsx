import { PlansE } from 'types/General';
import { STARTER_COPY } from '../plan.const';
import BasePlanCard, { Price } from './BasePlanCard';
import BeginStarterPlanButton from '@Modules/plans/BeginStarterPlanButton/BeginStarterPlanButton';
import { Icon } from '@mozilla/lilypad-ui';

const StarterPlanCard = () => {
  return (
    <BasePlanCard
      plan={PlansE.STARTER}
      title="Starter"
      color="silver"
      price={<Price price="Free" />}
      infoCopyList={STARTER_COPY}
      additionalContent={
        <div className="flex-align-center my-20">
          <div>
            <Icon name="alert-triangle" classProp="mr-25 ml-3" />
          </div>
          <span className="body-md">
            Auto pause after 12 hours of inactivity
          </span>
        </div>
      }
      confirmButton={<BeginStarterPlanButton text="Get Started" />}
    />
  );
};

export default StarterPlanCard;
