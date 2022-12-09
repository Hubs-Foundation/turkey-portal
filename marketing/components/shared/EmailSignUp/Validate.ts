interface FormValidation {
  email: string;
}

/**
 * Validate Form
 * @param param0
 * @returns Error Object | {}
 */
const validate = ({ email }: FormValidation) => {
  /**
   * Init
   */
  const errors: FormValidation = {
    email: '',
  };

  const isValid = {};

  /**
   * Name Validation
   */
  !email && (errors.email = `Required Name,`);
  const validEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  !validEmailPattern.test(email) &&
    (errors.email = `${errors.email} Not a valid email`);

  /**
   * No Errors, clean up
   */
  if (errors.email === '') {
    return isValid;
  }

  return errors;
};

export default validate;
