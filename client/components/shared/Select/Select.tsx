import React from 'react';
import { Icon } from '@mozilla/lilypad';
import {
  FocusEventHandler,
  ChangeEventHandler,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './Select.module.scss';

/**
 * Methods available to access the component in the parent component. These would most likley
 * only be used outside of the form context. Ie search input or some type of filter input.
 */
export type SelectInterfaceT = {
  focusSelect: Function;
  isDirty: Function;
};

export type OptionT = {
  value: string;
  title: string;
};

type SelectPropsT = {
  label: string;
  options: OptionT[];
  name: string;
  info?: string;
  classProp?: string;
  onBlur?: Function;
  onFocus?: Function;
  onChange?: Function;
  validator?: Function;
  required?: boolean;
  customErrorMessage?: string;
  value: string | number | readonly string[] | undefined;
  id?: string;
};

const Select = forwardRef(
  (
    {
      label,
      name,
      options,
      info = '',
      classProp = '',
      onChange,
      onBlur,
      onFocus,
      validator = () => true,
      required = false,
      customErrorMessage,
      value,
      id,
    }: SelectPropsT,
    ref
  ) => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [initialValue, setInitialValue] = useState(value); // used to check if dirty
    const [currentErrorMessage, setCurrentErrorMessage] = useState<string>('');
    const selectRef = useRef<HTMLSelectElement>(null);

    /**
     * Exposed Component API
     */
    useImperativeHandle(ref, () => {
      return {
        focusSelect: () => selectRef.current?.focus(),
        isDirty: () => isDirty,
      };
    });

    /**
     * Handle Select Change
     * @param event
     */
    const handleOnChange: ChangeEventHandler<HTMLSelectElement> = (
      event: ChangeEvent<HTMLSelectElement>
    ): ChangeEvent<HTMLSelectElement> => {
      const newValue = event.target.value;
      typeof onChange === 'function' && onChange(event);

      // If initial value was empty any change makes form dirty
      const isDirty = initialValue === '' ? true : initialValue !== newValue;
      setIsDirty(isDirty);
      return event;
    };

    /**
     * Handle Blue
     * @param event
     */
    const handleOnBlur: FocusEventHandler<HTMLSelectElement> = (event) => {
      typeof onBlur === 'function' && onBlur(event);
    };

    /**
     * Handle Focus
     */
    const handleOnFocus = () => {
      typeof onFocus === 'function' && onFocus();
    };

    /**
     * Validate Select
     */
    useEffect(() => {
      const select = selectRef.current;
      if (!select) return;

      const valid = select.validity.valid;
      const validationMessage = select.validationMessage;
      const validation = valid && validator(value);

      // Prop error message takes precedence
      if (!validation) {
        const message = customErrorMessage
          ? customErrorMessage
          : validationMessage;
        message ? setCurrentErrorMessage(message) : null;
      }
      setIsValid(validation);
    }, [value, customErrorMessage, validator]);

    /**
     * Error UI logic
     */
    const showError = isDirty && !isValid;
    const showInfo = info.length && !showError;

    return (
      <div
        className={`${styles.select_wrapper}  ${
          showError ? styles.select_error : null
        } ${classProp}`}
      >
        <label htmlFor={id}>
          {label}
          <span> {required ? '*' : ''}</span>
        </label>

        <select
          ref={selectRef}
          id={id}
          name={name}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
        >
          {options.map(({ value, title }) => {
            return <option value={value}>{title}</option>;
          })}
        </select>

        <Icon classProp={styles.arrow} name="chevron-down" />

        {/* Error Message */}
        {showError ? (
          <span className={styles.error_message}>{currentErrorMessage}</span>
        ) : (
          ''
        )}

        {/* Additional Select Information  */}
        {showInfo ? <span className={styles.info}>{info}</span> : ''}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;