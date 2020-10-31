import validator from 'validator'; // validate has a lot of built-in functions like isEmail(),isLength,...
import { isEmpty } from '../is-empty'; // instead of installing lodash and use isEmpty() of that, we created that function.

module.exports = function validateLoginInput (data) {
  // it's just a function that when it called, it takes some data and make sure that it's as the way as we want
  let errors = {}; // we create an empty errors object, so if there was an error, it gets fill

  // data.address_id = !isEmpty(data.address_id) ? data.address_id : ""; // check to make sure that if data was empty, it should be an empty string. not anything else
  data.usernameOrEmail = !isEmpty(data.usernameOrEmail)
    ? data.usernameOrEmail
    : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // for example we check that username length must be between 2 and 30
  if (!validator.isLength(data.usernameOrEmail, { min: 2, max: 150 })) {
    errors.usernameOrEmail =
      'username or email must be between 2 and 150 characters';
  }

  if (validator.isEmpty(data.usernameOrEmail)) {
    // the isEmpty() method here comes from validator module, and it's not the method we created by ourselves.
    errors.usernameOrEmail = 'username or email feild is required!';
  }
  if (!validator.isLength(data.password, { min: 6, max: 50 })) {
    errors.password = 'Password needs to be between 6 and 30 characters';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password feild is required!';
  }

  return {
    errors, // it means -> errors:errors , so if it's empty, it returns an empty object.
    isValid: isEmpty(errors) // and if it was empty,it returns true
  };
};
