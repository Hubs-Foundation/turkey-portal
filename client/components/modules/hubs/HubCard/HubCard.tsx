import { useContext, useMemo, useState } from 'react';
import styles from './HubCard.module.scss';
import { HubT, UpdateHubT, LastErrorE, StatusE } from 'types/General';
import { Message } from './Message';
import { StoreContext } from 'contexts/StoreProvider';
import { updateHub } from 'services/hub.service';
import ErrorBox from './ErrorBox';
import HubLink from './HubLink';
import HubLoading from './HubLoading';
import HubCardHeader from './HubCardHeader';
import HubCardFooter from './HubCardFooter';

type HubCardPropsT = {
  hub: HubT;
  refreshHubData?: Function;
  classProp?: string;
};

const HubCard = ({ hub, refreshHubData, classProp = '' }: HubCardPropsT) => {
  const storeContext = useContext(StoreContext);
  const { hubId, status, subdomain, domain, lastError } = hub;
  const [showRevertError, setShowRevertError] = useState<boolean>(
    lastError === LastErrorE.SUBDOMAIN_REVERTED
  );

  /**
   * Submit Update Hub
   * @param updatedHub
   * @param callback
   */
  const submit = async (updatedHub: UpdateHubT, callback: Function) => {
    try {
      const resp = await updateHub(hub.hubId, updatedHub);
      if (resp?.status === 200) {
        callback();
      } else {
        handleError();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updating Hub has failed - try again
   */
  const onTryReupdate = () => {
    /**
     * Note: use session data 'storeContext.lastSubmittedSubdomain' and
     * try and updates the Hub again.
     */
    const updatedHub: UpdateHubT = {
      ...hub,
      subdomain: storeContext.lastSubmittedSubdomain.subdomain,
    };

    submit(updatedHub, () => refreshHubData && refreshHubData());
  };

  /**
   * Submit hub no longer needs to be in reverted state.
   */
  const handleOnCloseError = () => {
    // patch the hub with lastError =  '' to clear out the error.
    const updatedHub: UpdateHubT = {
      ...hub,
      lastError: '',
    };
    submit(updatedHub, () => setShowRevertError(false));
  };

  const handleError = () => {
    console.error('Sorry, there was an error updating this Hub.');
  };

  /**
   * Check if session data is still holding last submitted domain
   * to display 'try again button'
   * @returns Boolean
   */
  const canTryAgain = (): boolean => {
    const { subdomain: _subdomain, hubId: _hubId } =
      storeContext.lastSubmittedSubdomain;
    if (_subdomain === '' || _hubId !== hubId) return false;

    return true;
  };

  /**
   * Hide / Show Card Footer
   */
  const footerVisible = useMemo(() => {
    return status === StatusE.READY;
  }, [status]);

  /**
   * Hide / Show Loader
   */
  const loadingVisible = useMemo(() => {
    return status === StatusE.CREATING || status === StatusE.UPDATING;
  }, [status]);

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      <div className={styles.card_container}>
        {/* HEADER  */}
        <HubCardHeader status={status} hubId={hubId} />

        {/* BODY  */}
        <div className={styles.card_body}>
          {/* TODO - figure out if a name is applied to a hub off the bat before we put "untitled hub" 
          here statically, might be able to just pull w/e through  */}
          <div className={`${styles.card_name} ${styles[status]}`}>Hub</div>

          {/* Did Revert Error  */}
          {showRevertError && (
            <ErrorBox
              classProp="mb-12"
              message={Message.updateSubdomainErrorMessage}
              onTryAgainClick={onTryReupdate}
              canTryAgain={canTryAgain()}
              onClose={handleOnCloseError}
            />
          )}

          {/* Critical Error 
            The user can not try aagin on critical error
            have the only contact button. 
          */}
          {lastError === LastErrorE.SUBDOMAIN_ERROR && (
            <ErrorBox message={Message.criticalFailMessage} />
          )}

          {/* Create Error 
            This error takes place when the hub first tries to build 
            and fails to do so.
          */}
          {lastError === LastErrorE.CREATING_ERROR && (
            <ErrorBox message={Message.createFailMessage} />
          )}

          {/* Default Error 
            This error takes place if the communication with the server fails (http server error) 
            and we need a "catch all" error status to show the user.
          */}
          {lastError === LastErrorE.ERROR && (
            <ErrorBox message={Message.errorMessage} />
          )}

          {/* Loading Subdomain Updates  */}
          {loadingVisible && (
            <HubLoading
              loadingMessage={
                status === StatusE.CREATING
                  ? Message.creatingMessage
                  : Message.updatingMessage
              }
            />
          )}

          {/* Subdomain is ready and available  */}
          {status === StatusE.READY && <HubLink subdomain={subdomain} domain={domain} />}
        </div>

        {/* FOOTER  */}
        {footerVisible && (
          <>
            <hr className={styles.card_hr} />
            <HubCardFooter hub={hub} />
          </>
        )}
      </div>
    </div>
  );
};

export default HubCard;
