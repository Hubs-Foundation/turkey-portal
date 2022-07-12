import {
  ChangeEventHandler,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import styles from './Input.module.scss';
import { InputT } from 'types/Form';

/**
 * Methods available to access the component in the parent component. These would most likley
 * only be used outside of the form context. Ie search input or some type of filter input.
 */
export type InputInterfaceT = {
  focusInput: Function;
  isDirty: Function;
};

type InputProps = {
  label: string;
  name: string;
  type?: InputT;
  info?: string;
  classProp?: string;
  onChange?: Function;
  validator?: Function;
  required?: boolean;
  customErrorMessage?: string;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  value: string | number | readonly string[] | undefined;
};

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      name,
      info = '',
      classProp = '',
      onChange,
      validator = () => true,
      required = false,
      customErrorMessage,
      pattern,
      maxLength,
      minLength,
      value,
    }: InputProps,
    ref
  ) => {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [initialValue, setInitialValue] = useState(value); // used to check if dirty
    const [currentErrorMessage, setCurrentErrorMessage] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    /**
     * Exposed Component API
     */
    useImperativeHandle(ref, () => {
      return {
        focusInput: () => inputRef.current?.focus(),
        isDirty: () => isDirty,
      };
    });

    /**
     * Handle Input Change
     * @param event
     */
    const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
      event: ChangeEvent<HTMLInputElement>
    ) => {
      const newValue = event.target.value;
      onChange && onChange(newValue);
      // If initial value was empty any change makes form dirty
      const isDirty = initialValue === '' ? true : initialValue !== newValue;
      setIsDirty(isDirty);
    };

    /**
     * Validate Input
     */
    useEffect(() => {
      const input = inputRef.current;
      if (!input) return;

      const valid = input?.validity.valid;
      const validationMessage = input?.validationMessage;
      // Validate against html and js validators
      const validation = valid && validator(value);

      // Prop error message takes precedence
      if (!validation) {
        const message = customErrorMessage
          ? customErrorMessage
          : validationMessage;
        message ? setCurrentErrorMessage(message) : '';
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
        className={`${styles.input_wrapper}  ${
          showError ? styles.input_error : null
        } ${classProp}`}
      >
        <label>
          {label}
          <span> {required ? '*' : ''}</span>
        </label>

        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          required={required}
          placeholder={label}
          onChange={handleOnChange}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
        />

        {/* Error Message */}
        {showError ? (
          <span className={styles.error_message}>{currentErrorMessage}</span>
        ) : (
          ''
        )}

        {/* Additional Input Information  */}
        {showInfo ? <span className={styles.info}>{info}</span> : ''}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
