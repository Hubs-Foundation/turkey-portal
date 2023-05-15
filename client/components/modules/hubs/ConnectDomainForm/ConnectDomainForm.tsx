import {
  Badge,
  Switch,
  BadgeCategoriesE,
  Input,
  Button,
} from '@mozilla/lilypad-ui';
import { useState, useCallback } from 'react';
import styles from './ConnectDomainForm.module.scss';
import FadeIn from '@Util/FadeIn';

type ConnectDomainFormPropsT = {
  classProp?: string;
};

const ConnectDomainForm = ({ classProp }: ConnectDomainFormPropsT) => {
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectSwitch = useCallback((value: boolean) => {
    console.log('test', value);
    setIsConnected(value);
  }, []);

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <header className={styles.header}>
        <Switch
          onChange={handleConnectSwitch}
          defaultState={isConnected}
          icon="x"
          iconOn="check"
          label="Connect a domain you own"
        />
        {/* TODO - need to make new brand badges and if have time rename to pills */}
        <Badge name="Beta" category={BadgeCategoriesE.PRIMARY} />
      </header>

      <FadeIn visible={isConnected}>
        <section className={styles.container}>
          <p className="mb-32 body-md">
            Please enter the domain hosted by an external service such as
            GoDaddy or 1&1. You do not need to add the “https://www.”
          </p>

          <Input
            id="hosted_domain"
            maxLength={24}
            classProp="u-width-100 mb-24"
            label="Hosted Domain"
            placeholder="Hosted Domain"
            required={true}
            name="hosted_domain"
            onChange={() => {}}
            onBlur={() => {}}
            value={''}
          />

          <p className="mb-32 body-md">
            To connect your domain held by an external provider to this hub you
            need to <b>add a new cname record</b> to the domain’s{' '}
            <b>DNS settings</b>.
          </p>

          <ol className="mb-32 pl-18 body-md">
            <li>Log in to your domain providers website.</li>
            <li>Access the domain’s DNS settings page.</li>
            <li>Add a new cname record with the following value:</li>
          </ol>

          <Input
            id="cname_record"
            maxLength={24}
            classProp="u-width-100 mb-24"
            label="Cname Record"
            placeholder="Cname Record"
            required={true}
            name="cname_record"
            onChange={() => {}}
            onBlur={() => {}}
            value={''}
          />

          <p className="mb-32 body-md">
            Ensure it is the last cname entry in the list or it is the only
            cname entry for that domain
          </p>

          <ol className="mb-32 pl-18 body-md" start={4}>
            <li>Save your DNS changes</li>
            <li>
              Click <b>verify</b>
            </li>
          </ol>

          <div className="flex-justify-end">
            <Button text="Verify" label="verify" />
          </div>
        </section>
      </FadeIn>
    </div>
  );
};

export default ConnectDomainForm;
