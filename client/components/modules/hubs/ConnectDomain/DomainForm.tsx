import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ButtonCategoriesE,
  Input,
  Button,
  CopyButton,
  Icon,
} from '@mozilla/lilypad-ui';
import styles from './ConnectDomain.module.scss';

type ConnectDomainPropsT = {
  classProp?: string;
};

const DomainForm = ({ classProp }: ConnectDomainPropsT) => {
  const [isConnected, setIsConnected] = useState(false);
  const [cname, setCname] = useState('Todo.com');

  useEffect(() => {
    // get info about the connection
  }, []);

  return (
    <section className={styles.container}>
      <p className="mb-32 body-md">
        Please enter the domain hosted by an external service such as GoDaddy or
        1&1. You do not need to add the “https://www.”
      </p>

      <div className="flex-align-center">
        <div className="mr-16 mb-30">https://www.</div>
        <Input
          showLabel={false}
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
      </div>

      <p className="mb-32 body-md">
        To connect your domain held by an external provider to this hub you need
        to <b>add a new cname record</b> to the domain’s <b>DNS settings</b>.
      </p>

      <ol className="mb-32 pl-18 body-md">
        <li>Log in to your domain providers website.</li>
        <li>Access the domain’s DNS settings page.</li>
        <li>Add a new cname record with the following value:</li>
      </ol>

      <div className="flex-align-center">
        <Input
          readOnly={true}
          id="cname_record"
          maxLength={24}
          classProp="u-width-100 mb-24"
          label="Cname Record"
          placeholder="Cname Record"
          name="cname_record"
          onChange={() => {}}
          onBlur={() => {}}
          value={cname}
        />

        <CopyButton value={`todo`} />
      </div>

      <p className="mb-32 body-md">
        Ensure it is the last cname entry in the list or it is the only cname
        entry for that domain
      </p>

      <ol className="mb-32 pl-18 body-md" start={4}>
        <li>Save your DNS changes</li>
        <li>
          Click <b>verify</b>
        </li>
      </ol>

      {isConnected ? (
        <div className="flex-justify-">
          <Button text="Verify" label="verify" />
        </div>
      ) : (
        <div className="flex-justify-between">
          <Button
            onClick={() => {}}
            text="Disconnect Domain"
            label="verify"
            category={ButtonCategoriesE.PRIMARY_OUTLINE}
          />

          <div className="flex-align-center color-semantic-success">
            <Icon name="check-circle" color="currentColor" classProp="mr-16" />
            Domain Varified
          </div>
        </div>
      )}
    </section>
  );
};

export default DomainForm;
