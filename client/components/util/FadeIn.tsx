import {
  PropsWithChildren,
  useEffect,
  useState,
  useCallback,
  Children,
  ReactNode,
} from 'react';

/**
 * FADE IN WRAPPER
 */
type FadeInWrapperPropsT = {
  visible: boolean;
  animation?: string;
  onComplete?: () => void;
  children: ReactNode;
};

const FadeInWrapper = ({
  visible = true,
  onComplete,
  animation,
  children,
}: FadeInWrapperPropsT) => {
  const [isOpen, setIsOpen] = useState<boolean>(visible);
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  useEffect(() => {
    onToggleClick();
  }, [visible]);

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
    onComplete && onComplete();
  }, [isOpen]);

  return (
    <FadeIn
      isVisible={isOpen}
      onComplete={handleOnComplete}
      animation={animation}
    >
      {isVisible && <>{children}</>}
    </FadeIn>
  );
};

/**
 * FADE IN COMPONENT
 */

type FadeInPropsT = {
  isVisible: Boolean;
  onComplete: () => void;
  children: ReactNode;
  animation?: string;
  classProp?: string;
};

export const FadeIn = ({
  isVisible,
  onComplete,
  children,
  animation = 'translateY(20px)',
  classProp,
}: PropsWithChildren<FadeInPropsT>) => {
  const [maxIsVisible, setMaxIsVisible] = useState(0);
  const arrayChildren = Children.toArray(children);

  useEffect(() => {
    // Get Number of children to fade in
    let count = Children.count(arrayChildren);

    // Animate all children out
    if (!isVisible) count = 0;

    // Fire (optional) callback when all visible
    if (count === maxIsVisible) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }

    // Increment or decrement MaxIsVisible
    const addOrSubtractOne = count > maxIsVisible ? 1 : -1;
    const timeout = setTimeout(() => {
      setMaxIsVisible((state) => state + addOrSubtractOne);
    }, 50);

    return () => clearTimeout(timeout);
  }, [maxIsVisible, isVisible, onComplete, arrayChildren]);

  return (
    <div className={`${classProp}`}>
      {Children.map(arrayChildren, (child, i) => {
        return (
          <div
            style={{
              transition: `opacity 500ms, transform 500ms`,
              transform: maxIsVisible > i ? 'none' : animation,
              opacity: maxIsVisible > i ? 1 : 0,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default FadeInWrapper;
