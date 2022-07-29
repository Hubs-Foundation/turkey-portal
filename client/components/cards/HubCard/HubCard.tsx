import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './HubCard.module.scss';
import {
  Button,
  Badge,
  ProgressBar,
  ButtonCategoriesE,
  BadgeCategoriesE,
  Icon,
  CopyButton,
} from '@mozilla/lilypad';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';

import Spinner from '@Shared/Spinner/Spinner';
import { TierT, StatusT } from 'types/General';

import { HUB_ROOT_DOMAIN } from 'config';

type HubCardPropsT = {
  name: string;
  tier: TierT;
  hubId: string;
  currentCcu: number | null;
  currentStorageMb: number | null;
  ccuLimit: number;
  status: StatusT;
  storageLimitMb: number;
  subdomain: string;
  classProp?: string;
};

export enum StorageStateE {
  DEFAULT = 'default',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

const HubCard = ({
  name,
  tier,
  hubId,
  currentCcu,
  currentStorageMb,
  ccuLimit,
  status,
  storageLimitMb,
  subdomain,
  classProp = '',
}: HubCardPropsT) => {
  const router = useRouter();
  const [storageState, setStorageState] = useState<StorageStateE>(
    StorageStateE.DEFAULT
  );

  /**
   * Get % Value of MB used
   */
  const getStoragePercent = (): number => {
    if (currentStorageMb === 0 || currentStorageMb === null) return 0;

    return (currentStorageMb / storageLimitMb) * 100;
  };

  useEffect(() => {
    const storagePercent = getStoragePercent();
    let status = StorageStateE.DEFAULT;

    storagePercent > 75 && (status = StorageStateE.WARNING);
    storagePercent === 100 && (status = StorageStateE.CRITICAL);

    setStorageState(status);
  }, [getStoragePercent]);

  /**
   * Handle Setting Click
   */
  const handleSettingClick = useCallback(() => {
    router.push({
      pathname: '/hubs/[hub_id]',
      query: { hub_id: hubId },
    });
  }, [hubId, router]);

  /**
   * Hub Loading State
   */
  const LoadingHub = (
    <div className="flex-align-center">
      <Spinner size={18} />
      <span className="u-font-14 margin-left-10">
        <span className="u-capitalize">{status}</span> your hub...
      </span>
    </div>
  );

  /**
   * Hub External Link
   */
  const HubLink = (
    <div className={styles.card_domain}>
      <ExternalLink
        target="_blank"
        href={`${subdomain}.${HUB_ROOT_DOMAIN}`}
        classProp="margin-right-20"
      >
        {subdomain}.{HUB_ROOT_DOMAIN}
      </ExternalLink>

      <CopyButton value={`${subdomain}.${HUB_ROOT_DOMAIN}`} />
    </div>
  );

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      <div className={styles.card_container}>
        {/* HEADER  */}
        <div className={styles.card_header}>
          <div className={styles.card_status_wrapper}>
            <div
              className={`${styles.card_status}  ${
                styles['card_status_' + status]
              }`}
            ></div>
            <div className="margin-left-10 u-capitalize">{status}</div>
          </div>
          <Button
            onClick={handleSettingClick}
            text="Edit Details"
            category={ButtonCategoriesE.PRIMARY_OUTLINE}
          />
        </div>

        {/* BODY  */}
        <div className={styles.card_body}>
          <div className={styles.card_name}>{name}</div>

          {/* TODO come back to this when you have loading design  */}
          {status === 'creating' || status === 'updating'
            ? LoadingHub
            : HubLink}
        </div>

        <hr className={styles.card_hr} />

        {/* FOOTER  */}
        <div className={styles.footer}>
          <div className={styles.footer_block}>
            <div className="u-text-center">
              <Badge name={tier} classProp="margin-bottom-12 u-block" category={BadgeCategoriesE.PRIMARY} />
              <div>Hub Tier</div>
            </div>
          </div>

          <div className={styles.footer_block}>
            <div className="u-text-center">
              <div
                className={`margin-bottom-12 ${
                  styles['status_' + storageState]
                }`}
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
      </div>
    </div>
  );
};

export default HubCard;
