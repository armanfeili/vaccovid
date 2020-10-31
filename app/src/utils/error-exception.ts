// export class ErrorException implements ErrorExceptionParams {
//   code: string;
//   statusCode?: number;
//   message?: string;
//   errors?: any[];

//   constructor(props: ErrorExceptionParams) {
//     this.code = props.code || 'unexpected';
//     this.statusCode = props.statusCode || 500;
//     this.message = props.message || 'Internal Server Error';
//     this.errors = props.errors;
//   }

//   static responseJson(err: any) {
//     return {
//       error: {
//         code: err.code,
//         message: err.message,
//         errors: err.errors,
//       },
//     };
//   }
// }
