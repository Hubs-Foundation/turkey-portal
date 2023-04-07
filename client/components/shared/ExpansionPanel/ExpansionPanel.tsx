import React, { ReactNode, useState, useCallback } from 'react';
import styles from './ExpansionPanel.module.scss';
import { Icon, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import FadeIn from '@Util/FadeIn';

export type ExpansionPanelPropsT = {
  title: string;
  children: ReactNode;
  classProp?: string;
};

const ExpansionPanel = ({
  title,
  children,
  classProp = '',
}: ExpansionPanelPropsT) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onToggleClick = () => {
    isOpen ? handleClose() : handleOpen();
  };

  const handleOpen = useCallback(() => {
    setIsVisible((state) => !state);
    setIsOpen((state) => !state);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const handleOnComplete = useCallback(() => {
    if (!isOpen) setIsVisible(false);
  }, [isOpen]);

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
          size={28}
          color="currentColor"
        />
      </button>

      <FadeIn isVisible={isOpen} onComplete={handleOnComplete}>
        {isVisible && <div className={styles.expand_content}>{children}</div>}
      </FadeIn>
    </section>
  );
};

export default ExpansionPanel;
