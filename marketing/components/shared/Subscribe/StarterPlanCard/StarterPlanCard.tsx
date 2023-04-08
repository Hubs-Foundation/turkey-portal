import { Button } from '@mozilla/lilypad-ui';
import { starterPlanInfoCopy } from '../BasePlanCard/planInfoCopy';
import { Price, BasePlanCard } from '../BasePlanCard/BasePlanCard';
import getEnvVariable from 'config';

export const StarterPlanCard = () => {
  const handleStarterPlanClick = () => {
    const url = getEnvVariable('PUBLIC_API_SERVER') + '/confirm-plan';
    window.open(url);
  };

  return (
    <BasePlanCard
      title="Starter"
      color="silver"
      price={<Price region={null} price="Free" />}
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