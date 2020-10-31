// import proxy from "http-proxy-middleware";
// module.exports = function(app) {
//   app.use(proxy("/api/**", { // https://github.com/chimurai/http-proxy-middleware
//     target: "http://localhost:5000",
//     secure: false
//   }));
// };

// const { createProxyMiddleware } = require('http-proxy-middleware');
//  app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true })); 

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};