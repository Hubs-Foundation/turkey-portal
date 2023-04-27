export const RegionPlanButton = (props) => {
  return (
    <Button
      label="Subscribe to hubs"
      text="Subscribe now"
      onClick={handleSubscribeClick}
      disabled={!locationConfirmed}
      {...props}
    />
  );
};
