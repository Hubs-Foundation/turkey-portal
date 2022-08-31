import store from './store';
import { AccountT } from 'types/General';
import { setAccount } from './accountSlice';
import { getAccount } from 'services/account.service';

/**
 * Init Account Store Data
 */
const initAccountData = () => {
  getAccount().then(({ displayName, email, profilePic }) => {
    const account: AccountT = {
      displayName,
      email,
      profilePic,
      isLoggedIn: true,
      isInitialized: true,
    };
    store.dispatch(setAccount(account));
  });
};

/**
 * Initialize All Store data here
 */
export default function initStoreData() {
  const { account } = store.getState();

  !account.isInitialized ? initAccountData() : '';
}
