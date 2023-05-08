import React, { ReactNode, useState, useCallback } from 'react';
import styles from './ExpansionPanel.module.scss';
import { Icon, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import FadeInWrapper from '@Util/FadeIn';

export type ExpansionPanelPropsT = {
  title: string;
  children: ReactNode;
  expanded?: boolean;
  classProp?: string;
};

// TODO set an init open value
const ExpansionPanel = ({
  title,
  children,
  expanded = false,
  classProp = '',
}: ExpansionPanelPropsT) => {
  const [isOpen, setIsOpen] = useState<boolean>(expanded);

  const onToggleClick = () => {
    setIsOpen((state) => !state);
  };

  return (
    <section className={`${styles.wrapper} ${classProp}`}>
      <button
        className={styles.header}
        onClick={onToggleClick}
        aria-label="toggle"
      >
        <h3 className="heading-xxs">{title}</h3>
        <Icon
          classProp={styles.expand_button}
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={22}
          color="currentColor"
        />
      </button>

      <FadeInWrapper visible={isOpen}>
        <div className={styles.expand_content}>{children}</div>
      </FadeInWrapper>
    </section>
  );
};

export default ExpansionPanel;
