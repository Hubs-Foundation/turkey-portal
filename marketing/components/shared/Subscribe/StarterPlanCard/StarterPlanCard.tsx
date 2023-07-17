import { Button, Icon } from '@mozilla/lilypad-ui';
import { STARTER_COPY } from '../plan.const';
import { Price, BasePlanCard } from '../BasePlanCard/BasePlanCard';
import getEnvVariable from 'config';

const StarterPlanCard = () => {
  const handleStarterPlanClick = () => {
    const url = getEnvVariable('PUBLIC_API_SERVER') + '/confirm-plan';
    window.open(url);
  };

  return (
    <BasePlanCard
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
      confirmButton={
        <Button
          label="Create free hub"
          text="Get Started"
          onClick={handleStarterPlanClick}
        />
      }
    />
  );
};

export default StarterPlanCard;
