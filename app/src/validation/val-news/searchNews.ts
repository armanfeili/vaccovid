import validator from 'validator'; // validate has a lot of built-in functions like isEmail(),isLength,...
import { isEmpty } from '../is-empty'; // instead of installing lodash and use isEmpty() of that, we created that function.

export function validateSearchNews(data: any) {
  let errors: { search_term: string } = { search_term: data }; // we create an empty errors object, so if there was an error, it gets fill
  // let errors = {};

  let valid: boolean = true;
  data.search_term = !isEmpty(data.search_term) ? data.search_term : '';
  // if (data.search_term) {
  data.search_term = data.search_term.trim();
  // }

  // check if the string contains only letters and numbers.
  if (!validator.isAlphanumeric(data.search_term)) {
    errors.search_term = 'wrods should only contain letters and numbers.';
    valid = false;
  }

  // we support search button even if the field was empty
  if (validator.isEmpty(data.search_term)) {
    // errors.search_term = 'search bar is empty!';
    valid = true;
  }

  return {
    errors, // it means -> errors:errors , so if it's empty, it returns an empty object.
    isValid: valid,
  };
}
