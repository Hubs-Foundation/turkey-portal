import { Badge, ProgressBar, BadgeCategoriesE, Icon } from '@mozilla/lilypad';
import { StorageStateE, HubT } from 'types/General';
import { useState, useEffect, useCallback } from 'react';
import styles from './HubCardFooter.module.scss';

type HubCardFooterPropsT = {
  hub: HubT;
  classProp?: string;
};

const HubCardFooter = ({ hub, classProp = '' }: HubCardFooterPropsT) => {
  const { tier, currentStorageMb, storageLimitMb } = hub;
  const [storageState, setStorageState] = useState<StorageStateE>(
    StorageStateE.DEFAULT
  );

  /**
   * Get % Value of MB used
   */
  const getStoragePercent = useCallback((): number => {
    if (currentStorageMb === 0 || currentStorageMb === null) return 0;
    return Math.min(100, currentStorageMb / storageLimitMb) * 100;
  }, []);

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
        <div className="u-text-center">
          <Badge
            name={tier}
            classProp="margin-bottom-12 u-block"
            category={BadgeCategoriesE.PRIMARY}
          />
          <div>Hub Tier</div>
        </div>
      </div>

      {/* Storage Information  */}
      <div className={styles.footer_block}>
        <div className="u-text-center">
          <div
            className={`margin-bottom-12 ${styles['status_' + storageState]}`}
          >
            <span className="u-color-text-main">{currentStorageMb}</span>
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
