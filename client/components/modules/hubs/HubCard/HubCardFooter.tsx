import { ProgressBar, Icon, Pill } from '@mozilla/lilypad-ui';
import { StorageStateE, HubT, PlansE } from 'types/General';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/accountSlice';
import styles from './HubCardFooter.module.scss';

type PlanPropsT = {
  name: PlansE | null;
};

const Plan = ({ name }: PlanPropsT) => {
  return (
    <div className="text-center">
      {name && <Pill classProp="mb-12 block" title={name} category="primary" />}
      <p>Hub Plan</p>
    </div>
  );
};

type HubCardFooterPropsT = {
  hub: HubT;
  classProp?: string;
};

const HubCardFooter = ({ hub, classProp = '' }: HubCardFooterPropsT) => {
  const { planName } = useSelector(selectAccount);
  const { currentStorageMb, storageLimitMb } = hub;
  const [storageState, setStorageState] = useState<StorageStateE>(
    StorageStateE.DEFAULT
  );

  /**
   * Get % Value of MB used
   */
  const getStoragePercent = useCallback((): number => {
    if (currentStorageMb === 0 || currentStorageMb === null) return 0;
    return Math.min(100, currentStorageMb / storageLimitMb) * 100;
  }, [currentStorageMb, storageLimitMb]);

  /**
   * Round number to 2 dec
   * @param num
   * @returns num | string
   */
  const round = (num: number | null): number | string => {
    if (num == null) return 'Configuring';

    // TODO - In the future, I guess we'd use i18n routing and useRouter to get the current
    // locale, but for now default to "en-US".
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(num);
  };

  /**
   * Watch Storage Percentage
   */
  useEffect(() => {
    const storagePercent = getStoragePercent();
    let status = StorageStateE.DEFAULT;

    storagePercent > 75 && (status = StorageStateE.WARNING);
    storagePercent >= 100 && (status = StorageStateE.CRITICAL);

    setStorageState(status);
  }, [getStoragePercent]);

  return (
    <div className={`${styles.footer} ${classProp}`}>
      {/* Tier Information  */}
      <div className={styles.footer_block}>
        <Plan name={planName} />
      </div>

      {/* Storage Information  */}
      <div className={styles.footer_block}>
        <div className="text-center">
          <div className={`mb-12 ${styles['status_' + storageState]}`}>
            <span className="color-text-main">{round(currentStorageMb)}</span>
            <span>/{storageLimitMb} MB</span>
          </div>
          <div className="flex-justify-center">
            <div className={styles.progressbar_wrapper}>
              {storageState !== StorageStateE.DEFAULT ? (
                <Icon
                  classProp={`${styles.storage_icon} ${
                    styles['storage_icon_' + storageState]
                  }`}
                  name="alert-triangle"
                />
              ) : null}
              <ProgressBar
                value={getStoragePercent()}
                classValueProp={styles['progressbar_' + storageState]}
              />
            </div>
          </div>
          <div>Content Storage Space</div>
        </div>
      </div>
    </div>
  );
};

export default HubCardFooter;
