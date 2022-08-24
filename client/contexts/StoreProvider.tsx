import { createContext, ReactNode, useState } from 'react';

export type SubdomainRetryT = {
  subdomain: string;
  hubId: string;
};
type StoreProviderProps = {
  children?: ReactNode;
};
/**
 * Note: This is a top level data storage for global data that does not change
 * frequently and does not require the complexity of Redux.
 */
const initSubdomain: SubdomainRetryT = { subdomain: '', hubId: '' };

export const StoreContext = createContext({
  lastSubmittedSubdomain: initSubdomain,
  handleThemeChange: (value: SubdomainRetryT) => {},
});

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [subdomain, setSubdomain] = useState<SubdomainRetryT>(initSubdomain);
  const handleThemeChange = (value: SubdomainRetryT): void => {
    setSubdomain(value);
  };

  return (
    <StoreContext.Provider
      value={{
        lastSubmittedSubdomain: subdomain,
        handleThemeChange,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
