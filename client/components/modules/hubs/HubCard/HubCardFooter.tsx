import { useMemo } from 'react';
import { ProgressBar, Icon, Pill } from '@mozilla/lilypad-ui';
import { StorageStateE, HubT, PlansE } from 'types/General';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/accountSlice';
import styles from './HubCardFooter.module.scss';
import Hub from 'classes/Hub';

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

const HubCardFooter = ({ hub: _hub, classProp = '' }: HubCardFooterPropsT) => {
  const { planName } = useSelector(selectAccount);
  const hub = useMemo(() => new Hub(_hub), [_hub]);
  const storageState = hub.getStorageState();

  return (
    <div className={`${styles.footer} ${classProp}`}>
      {/* Plan Information  */}
      <div className={styles.footer_block}>
        <Plan name={planName} />
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
