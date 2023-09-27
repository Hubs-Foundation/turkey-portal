import { useState } from 'react';
import { Button, CopyButton, Input, ToolTip } from '@mozilla/lilypad-ui';
import styles from './SecretCopy.module.scss';

type SecretCopyPropsT = {
  secret: string;
  classProp?: string;
};

const SecretCopy = ({ secret, classProp = '' }: SecretCopyPropsT) => {
  const [isVisible, seIsVisible] = useState(false);

  return (
    <div className={`flex ${classProp}`}>
      <Input
        readOnly={true}
        type={isVisible ? 'text' : 'password'}
        label="Get turkeyauthtoken"
        value={secret}
        placeholder="Token"
        name="Token"
      />
      <div className={styles.buttons}>
        <Button
          icon={isVisible ? 'eye-off' : 'eye'}
          category="primary_outline"
          size="small"
          classProp="mx-12"
          onClick={() => seIsVisible((state) => !state)}
        />

        <ToolTip description="Copy token to clipboard." location="left">
          <CopyButton value={secret} />
        </ToolTip>
      </div>
    </div>
  );
};

export default SecretCopy;
