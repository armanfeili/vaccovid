// Stub declarations for deprecated utilities to allow TypeScript build without installing unused packages.
declare module 'rss-parser' {
  const Parser: any;
  export default Parser;
}

declare module 'axios' {
  const axios: any;
  export default axios;
}

declare module 'covid19-api' {
  const covidApi: any;
  export = covidApi;
}
