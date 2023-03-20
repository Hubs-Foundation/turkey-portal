import store from './store';
import { AccountT } from 'types/General';
import { setAccount } from './accountSlice';
import { getAccount } from 'services/account.service';

/**
 * Init Account Store Data
 */
export const initAccountData = async () => {
  try {
    const { displayName, email, profilePic, hasSubscription, hasCreatingHubs } =
      await getAccount();
    const account: AccountT = {
      displayName,
      email,
      profilePic,
      hasSubscription,
      hasCreatingHubs,
      isLoggedIn: true,
      isInitialized: true,
    };
    store.dispatch(setAccount(account));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Initialize All Store data here
 */
export default function initStoreData() {
  const { account } = store.getState();

  !account.isInitialized ? initAccountData() : '';
}
