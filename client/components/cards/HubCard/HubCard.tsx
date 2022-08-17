import { useContext } from 'react';
import styles from './HubCard.module.scss';
import { HubT, UpdateHubT } from 'types/General';
import ErrorBox from './ErrorBox';
import { Message } from './Message';
import { StoreContext } from 'contexts/StoreProvider';
import HubLink from './HubLink';
import HubLoading from './HubLoading';
import HubCardHeader from './HubCardHeader';
import HubCardFooter from './HubCardFooter';
import { updateHub } from 'services/hub.service';

type HubCardPropsT = {
  hub: HubT;
  refreshHubData: Function;
  classProp?: string;
};

const HubCard = ({ hub, refreshHubData, classProp = '' }: HubCardPropsT) => {
  const storeContext = useContext(StoreContext);
  const { name, hubId, status, subdomain } = hub;

  /**
   * QUESTIONS ------
   * What does the error object look like?
   * Are all the status on StatusT accurate?
   * is there an isReverted flag?
   */

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
    /**
     * Note: use session data 'storeContext.lastSubmittedSubdomain' and
     * try and updates the Hub again.
     */
    const updatedHub: UpdateHubT = {
      ...hub,
      subdomain: storeContext.lastSubmittedSubdomain.subdomain,
    };

    updateHub(hub.hubId, updatedHub).then(() => {
      refreshHubData && refreshHubData();
    });
  };

  /**
   * Submit hub no longer needs to be in reverted state.
   */
  const handleOnCloseError = () => {
    console.log(
      'confirming the user has seen the revert error and can change status back to non reverting.'
    );
  };

  /**
   * Check if session data is still holding last submitted domain
   * to display 'try again button'
   * @returns Boolean
   */
  const canTryAgain = (): boolean => {
    if (storeContext.lastSubmittedSubdomain.subdomain === '') return false;
    if (storeContext.lastSubmittedSubdomain.hubId !== hubId) return false;

    return true;
  };

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      <div className={styles.card_container}>
        {/* HEADER  */}
        <HubCardHeader status={status} hubId={hubId} />

        {/* BODY  */}
        <div className={styles.card_body}>
          {/* TODO - figure out if a name is applied to a hub off the bat before we put "untitled hub" 
          here statically, might be able to just pull w/e through  */}
          <div className={styles.card_name}>{name}</div>

          {/* Did Revert Error  */}
          {true && (
            <ErrorBox
              classProp="margin-bottom-12"
              message={Message.updateSubdomainErrorMessage}
              onTryAgainClick={onTryReupdate}
              canTryAgain={canTryAgain()}
              onClose={handleOnCloseError}
            />
          )}

          {/* Critical Error */}
          {/* status === 'subdomainError' */}
          { true ? (
            <ErrorBox
              message={Message.failMessage}
              onTryAgainClick={onTryRebuild}
              canTryAgain={canTryAgain()}
            />
          ) : (
            // If Creating / Updating show loading else show subdomain link
            <>
              {status === 'creating' || status === 'updating' ? (
                <HubLoading
                  loadingMessage={
                    status === 'creating'
                      ? Message.creatingMessage
                      : Message.updatingMessage
                  }
                />
              ) : (
                <HubLink subdomain={subdomain} />
              )}
            </>
          )}
        </div>

        {/* FOOTER  */}
        {status !== 'creating' && status !== 'subdomainError' && (
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
