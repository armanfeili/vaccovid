export const errorMessages = {
  DATA_REQUEST_INVALID: {
    code: 'data_request_invalid',
    message: 'Invalid data request from user input',
    statusCode: 422,
  },
  USER_EXIST: {
    code: 'user_exist',
    message: 'User exist',
    statusCode: 400,
  },
  USER_NOT_EXIST: {
    code: 'user_not_exist',
    message: 'User does not exist',
    statusCode: 404,
  },
  USER_PASSWORD_NOT_MATCH: {
    code: 'user_password_not_match',
    message: 'User password not match',
    statusCode: 400,
  },
  JWT_TOKEN_NOT_FOUND: {
    code: 'jwt_token_not_found',
    message: 'JWT token not found on the authorization header',
    statusCode: 401,
  },
  JWT_TOKEN_INVALID: {
    code: 'jwt_token_invalid',
    message: 'Invalid JWT token',
    statusCode: 401,
  },
  JWT_TOKEN_EXPIRED: {
    code: 'jwt_token_expired',
    message: 'JWT token expired',
    statusCode: 401,
  },
  JWT_UNKNOWN: {
    code: 'jwt_unknown',
    message: 'JWT unknown error',
    statusCode: 401,
  },
};
