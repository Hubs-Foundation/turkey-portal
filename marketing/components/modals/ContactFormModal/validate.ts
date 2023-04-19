interface FormValidation {
  email: string;
}

/**
 * Validate Form
 * @param FormValidation
 * @returns Error Object | {}
 */
const validate = ({ email }: FormValidation) => {
  // Init
  const errors: FormValidation = {
    email: '',
  };

  const isValid = {};

  // Email Validation
  !email && (errors.email = `Required Email`);
  const validEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  !validEmailPattern.test(email) &&
    (errors.email = `${errors.email}${
      Boolean(errors.email.length) ? ',' : ''
    } Not a valid email`);

  // No Errors, return empty error object
  if (errors.email === '') {
    return isValid;
  }

  return errors;
};

export default validate;
