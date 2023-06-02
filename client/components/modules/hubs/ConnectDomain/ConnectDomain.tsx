import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Pill,
  Switch,
  switchT,
  ButtonCategoriesE,
  Input,
  Button,
  CopyButton,
  ToolTip,
  Icon,
} from '@mozilla/lilypad-ui';
import styles from './ConnectDomain.module.scss';
import FadeIn from '@Util/FadeIn';
import DomainForm from './DomainForm';
import ConfirmModal from '@Shared/ConfirmModal/ConfirmModal';

type ConnectDomainPropsT = {
  classProp?: string;
};

const ConnectDomain = ({ classProp }: ConnectDomainPropsT) => {
  const [isConnected, setIsConnected] = useState(false);
  const [defaultSwitchState, setDefaultSwitchState] = useState(true);
  const [cname, setCname] = useState('Todo.com');
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const SwitchRef = useRef<switchT>(null);

  const onCancel = () => {
    setShowModal(false);
    SwitchRef.current?.setValue(true);
  };

  const onContinue = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // get info about the connection
  }, []);

  const handleConnectSwitch = useCallback((value: boolean) => {
    if (value) {
      setShowForm(true);
      return;
    }

    setShowModal(true);
  }, []);

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <header className={styles.header}>
        <Switch
          ref={SwitchRef}
          onChange={handleConnectSwitch}
          defaultState={defaultSwitchState}
          icon="x"
          iconOn="check"
          label="Connect a domain you own"
        />

        <ToolTip description="This feature is currently under Beta.">
          <Pill title="Beta" classProp="my-10 block" category="cool" />
        </ToolTip>
      </header>

      <FadeIn visible={showForm}>
        <DomainForm />
      </FadeIn>

      {showModal && (
        <ConfirmModal
          title="Confirm Disconnect"
          message={
            <p className="body-md">
              Please confirm if you really want to disconnect your domain.
            </p>
          }
          onCancel={onCancel}
          onContinue={onContinue}
        />
      )}
    </div>
  );
};

export default ConnectDomain;
