import store from './store';
import { AccountT } from 'types/General';
import { setAccount } from './accountSlice';
import { setRegion } from './regionSlice';
import { getAccount } from 'services/account.service';
import { getRegion } from 'services/region.service';

/**
 * Init Account Store Data
 */
export const initAccountData = async () => {
  try {
    const {
      displayName,
      email,
      profilePic,
      hasSubscription,
      hasCreatingHubs,
      hasPlan,
      planName = null,
    } = await getAccount();
    const account: AccountT = {
      displayName,
      email,
      profilePic,
      hasSubscription,
      hasCreatingHubs,
      isLoggedIn: true,
      isInitialized: true,
      hasPlan,
      planName,
    };
    store.dispatch(setAccount(account));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Init Region Data
 */
const initRegionData = async () => {
  try {
    const region = await getRegion();
    store.dispatch(setRegion(region));
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

  initRegionData();
}
