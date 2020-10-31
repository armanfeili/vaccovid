// import { Request, Response, NextFunction } from 'express';
// import { validationResult } from 'express-validator';
// import { ErrorException } from './error-exception';
// import { errorMessages } from 'constants/error-messages';

// export const validateRequest = (validations: any[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     await Promise.all(
//       validations.map((validation: any) => validation.run(req)),
//     );

//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//       return next();
//     }

//     const error = new ErrorException({
//       ...errorMessages.DATA_REQUEST_INVALID,
//       errors: errors.array(),
//     });
//     res.status(error.statusCode).json(ErrorException.responseJson(error));
//   };
// };
