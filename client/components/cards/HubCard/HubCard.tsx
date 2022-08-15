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
import Loader from '@Shared/Loader/Loader';
import { TierT, StatusT } from 'types/General';
import { HUB_ROOT_DOMAIN } from 'config';
import ErrorBox from './ErrorBox';
import { Message } from './Message'

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
  updateDomainDidFail:boolean,
  classProp?: string;
};

export enum StorageStateE {
  DEFAULT = 'default',
  WARNING = 'warning',
  CRITICAL = 'critical',
};

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
  updateDomainDidFail,
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

  /**
   * Building New Hub has failed - try again
   */
  const onTryRebuild = () => {
    console.log('trying to build new hub again.');
  };

  /**
   * Updating Hub has failed - try again
   */
  const onTryReupdate = () => {
    console.log(
      'trying to update subdomain again. Get hub info from Redux - fyi will put subdomain user puts in the form as "lastSubdomainSubmited".'
    );
  };

  /**
   * Watch Storage Percentage
   */
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
   * Hub Loading State - JSX
   */
  const LoadingHub = (loadingMessage: string) => {
    return (
      <div className="flex-align-center">
        <Loader />
        <span className="u-font-14 margin-left-10">
          {loadingMessage}
        </span>
      </div>
    );
  };

  /**
   * Hub External Link - JSX
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

          {/* Edit Hubs Details  */}
          {status !== 'creating' && status !== 'updating' && (
            <Button
              onClick={handleSettingClick}
              text="Edit Details"
              category={ButtonCategoriesE.PRIMARY_OUTLINE}
            />
          )}
        </div>

        {/* BODY  */}
        <div className={styles.card_body}>
          {/* TODO - figure out if a name is applied to a hub off the bat before we put "untitled hub" 
          here statically, might be able to just pull w/e through  */}
          <div className={styles.card_name}>{name}</div>

          {updateDomainDidFail && (
            <ErrorBox
              classProp="margin-bottom-12"
              message={Message.updateSubdomainErrorMessage}
              onTryAgainClick={onTryReupdate}
            />
          )}

          {status === 'failed' ? (
            <ErrorBox message={Message.failMessage} onTryAgainClick={onTryRebuild} />
          ) : (
            <>
              {status === 'creating' || status === 'updating'
                ? LoadingHub(
                    status === 'creating' ? Message.creatingMessage : Message.updatingMessage
                  )
                : HubLink}
            </>
          )}
        </div>

        {/* FOOTER  */}
        {status !== 'creating' && status !== 'failed' && (
          <>
            <hr className={styles.card_hr} />

            <div className={styles.footer}>
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

              <div className={styles.footer_block}>
                <div className="u-text-center">
                  <div
                    className={`margin-bottom-12 ${
                      styles['status_' + storageState]
                    }`}
                  >
                    <span className="u-color-text-main">
                      {currentStorageMb}
                    </span>
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
          </>
        )}
      </div>
    </div>
  );
};

export default HubCard;
