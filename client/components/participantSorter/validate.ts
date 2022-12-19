export interface FormValues {
  event_name: string;
  start_date: Date;
  start_time: string;
  allow_early_entry: boolean;
  early_entry_minuts: number;
}

/**
 * Validate Form
 * @param param0
 * @returns Error Object | {}
 */
const validate = ({ name, subdomain }: FormValues) => {
  // /**
  //  * Init
  //  */
  // const errors: FormValues = {
  //   name: '',
  //   subdomain: '',
  // };
  // const isValid = {};

  // /**
  //  * Name Validation
  //  */
  // !name && (errors.name = `Required Name`);

  // /**
  //  * Subdomain Validation
  //  */
  // !subdomain && (errors.subdomain = `Required Name,`);

  // // Supports letters (a to z), digits (0 to 9), and hyphens (-)
  // const pattern = /^[a-zA-Z0-9-]{3,63}$/;
  // !pattern.test(subdomain) &&
  //   (errors.subdomain = `${errors.subdomain} Pattern not matching,`);

  // // Cannot start or end with a hyphen (-)
  // (subdomain.startsWith('-') || subdomain.endsWith('-')) &&
  //   (errors.subdomain = `${errors.subdomain} Cannot start or end with a hyphen (-)`);

  // /**
  //  * No Errors, clean up
  //  */
  // if (errors.name === '' && errors.subdomain === '') {
  //   return isValid;
  // }

  // return errors;
  return {};
};

export default validate;
