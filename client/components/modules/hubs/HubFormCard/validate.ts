export interface FormValues {
  name: string;
  subdomain: string;
}

/**
 * Validate Form
 * @param FormValues
 * @returns Error Object | {}
 */
const validate = ({ name, subdomain }: FormValues) => {
  // Init
  const errors: FormValues = {
    name: '',
    subdomain: '',
  };
  const isValid = {};

  // Name Validation
  !name && (errors.name = `Required Name`);

  // Subdomain Validation
  !subdomain && (errors.subdomain = `Required Subdomain`);

  // Supports letters (a to z), digits (0 to 9), and hyphens (-)
  const pattern = /^[a-zA-Z0-9-]{3,63}$/;
  !pattern.test(subdomain) &&
    (errors.subdomain = `${errors.subdomain}${
      errors.subdomain.length && ','
    } Pattern not matching`);

  // Cannot start or end with a hyphen (-)
  (subdomain.startsWith('-') || subdomain.endsWith('-')) &&
    (errors.subdomain = `${errors.subdomain}${
      errors.subdomain.length && ','
    } Cannot start or end with a hyphen (-)`);

  // No Errors, return empty error object
  if (errors.name === '' && errors.subdomain === '') {
    return isValid;
  }

  return errors;
};

export default validate;
