import { StorageStateE, HubT, FormattedTierT } from 'types/General';
import Hub from 'types/Hub';
import { ProgressBar, Icon, Pill } from '@mozilla/lilypad-ui';
import styles from './HubCardFooter.module.scss';

type TierPropsT = {
  tier: FormattedTierT;
};

const Tier = ({ tier }: TierPropsT) => {
  return (
    <div className="text-center">
      <Pill classProp="mb-12 block" title={tier} category="primary" />
      <p>Hub Plan</p>
    </div>
  );
};

type HubCardFooterPropsT = {
  hub: HubT;
  classProp?: string;
};

const HubCardFooter = ({ hub: _hub, classProp = '' }: HubCardFooterPropsT) => {
  const hub = new Hub(_hub);
  const storageState = hub.getStorageState();

  return (
    <div className={`${styles.footer} ${classProp}`}>
      {/* Tier Information  */}
      <div className={styles.footer_block}>
        <Tier tier={hub.formattedTier()} />
      </div>

      {/* Storage Information  */}
      <div className={styles.footer_block}>
        <div className="text-center">
          <div className={`mb-12 ${styles['status_' + storageState]}`}>
            <span className="color-text-main">
              {hub.roundedCurrentStorageMb()}
            </span>
            <span>/{hub.storageLimitMb} MB</span>
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
                value={hub.getStoragePercent()}
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
