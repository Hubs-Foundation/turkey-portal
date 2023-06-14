import { Button } from '@mozilla/lilypad-ui';
import { starterPlanInfoCopy } from '../BasePlanCard/planInfoCopy';
import { Price, BasePlanCard } from '../BasePlanCard/BasePlanCard';
import getEnvVariable from 'config';

const StarterPlanCard = () => {
  const handleStarterPlanClick = () => {
    const url = getEnvVariable('PUBLIC_API_SERVER') + '/confirm-plan';
    window.open(url);
  };

  return (
    <BasePlanCard
      isSoldOut={true}
      title="Starter"
      color="silver"
      price={<Price price="Free" />}
      infoCopyList={starterPlanInfoCopy}
      confirmButton={
        <Button
          label="Create free hub"
          text="Create free hub"
          onClick={handleStarterPlanClick}
        />
      }
    />
  );
};

export default StarterPlanCard;
