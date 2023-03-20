import Loader from '@Shared/Loader/Loader';

type HubLoadingPropsT = {
  loadingMessage: string;
  classProp?: string;
};

const HubLoading = ({ loadingMessage, classProp = '' }: HubLoadingPropsT) => {
  return (
    <div className={`flex-align-center ${classProp}`}>
      <Loader />
      <span className="font-14 ml-10">{loadingMessage}</span>
    </div>
  );
};

export default HubLoading;
