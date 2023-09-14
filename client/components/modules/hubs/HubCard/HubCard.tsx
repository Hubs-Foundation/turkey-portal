import { useContext, useState, useMemo } from 'react';
import styles from './HubCard.module.scss';
import { HubT, LastErrorE, StatusE } from 'types/General';
import { Message } from './Message';
import { StoreContext } from 'contexts/StoreProvider';
import ErrorBox from './ErrorBox';
import HubLink from './HubLink';
import HubLoading from './HubLoading';
import HubCardHeader from './HubCardHeader';
import HubCardFooter from './HubCardFooter';
import Hub from 'classes/Hub';

type HubCardPropsT = {
  hub: HubT;
  refreshHubData?: Function;
  classProp?: string;
};

const HubCard = ({ hub: _hub, refreshHubData, classProp }: HubCardPropsT) => {
  const storeContext = useContext(StoreContext);
  const hub = useMemo(() => new Hub(_hub), [_hub]);
  const [showRevertError, setShowRevertError] = useState<boolean>(
    hub.lastError === LastErrorE.SUBDOMAIN_REVERTED
  );

  /**
   * Updating Hub has failed - try again
   */
  const onTryReupdate = async () => {
    /**
     * Note: use session data 'storeContext.lastSubmittedSubdomain' and
     * try and updates the Hub again.
     */
    try {
      const resp = await hub.updateSubdomain(
        storeContext.lastSubmittedSubdomain.subdomain
      );
      // Refresh data after update.
      if (resp?.status === 200) {
        () => refreshHubData && refreshHubData();
      } else {
        console.error('Sorry, there was an error updating this Hub.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Check if session data is still holding last submitted domain
   * to display 'try again button'
   * @returns Boolean
   */
  const canTryAgain = (): boolean => {
    const { subdomain, hubId } = storeContext.lastSubmittedSubdomain;
    if (subdomain === '' || hubId !== hub.hubId) return false;

    return true;
  };

  /**
   * Hide / Show Loader
   */
  const loadingVisible = () => {
    return hub.status === StatusE.CREATING || hub.status === StatusE.UPDATING;
  };

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      <div className={styles.card_container}>
        {/* HEADER  */}
        <HubCardHeader status={hub.status} hubId={hub.hubId} />

        {/* BODY  */}
        <div className={styles.card_body}>
          {/* TODO - figure out if a name is applied to a hub off the bat before we put "untitled hub"
          here statically, might be able to just pull w/e through  */}
          <div className={`${styles.card_name} ${styles[hub.status]}`}>Hub</div>

          {/* Did Revert Error  */}
          {showRevertError && (
            <ErrorBox
              classProp="mb-12"
              message={Message.updateSubdomainErrorMessage}
              onTryAgainClick={onTryReupdate}
              canTryAgain={canTryAgain()}
              onClose={() => setShowRevertError(false)}
            />
          )}

          {/* Critical Error
            The user can not try aagin on critical error
            have the only contact button.
          */}
          {hub.lastError === LastErrorE.SUBDOMAIN_ERROR && (
            <ErrorBox message={Message.criticalFailMessage} />
          )}

          {/* Create Error
            This error takes place when the hub first tries to build
            and fails to do so.
          */}
          {hub.lastError === LastErrorE.CREATING_ERROR && (
            <ErrorBox message={Message.createFailMessage} />
          )}

          {/* Default Error
            This error takes place if the communication with the server fails (http server error)
            and we need a "catch all" error status to show the user.
          */}
          {hub.lastError === LastErrorE.ERROR && (
            <ErrorBox message={Message.errorMessage} />
          )}

          {/* Loading Subdomain Updates  */}
          {loadingVisible() && (
            <HubLoading
              loadingMessage={
                hub.status === StatusE.CREATING
                  ? Message.creatingMessage
                  : Message.updatingMessage
              }
            />
          )}

          {/* Subdomain is ready and available  */}
          {hub.status === StatusE.READY && <HubLink url={hub.fullDomain} />}
        </div>

        {/* FOOTER  */}
        {hub.status === StatusE.READY && (
          <>
            <hr className={styles.card_hr} />
            <HubCardFooter hub={_hub} />
          </>
        )}
      </div>
    </div>
  );
};

export default HubCard;
