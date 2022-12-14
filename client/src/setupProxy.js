const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  /*  app.use(
     createProxyMiddleware(["/user"], { target: process.env.REACT_APP_BASE_URL + "" })
   ); */
  app.use('/user',
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    })
  );

  app.use(
    '/questions',
    createProxyMiddleware({
      target: process.env.REACT_APP_BASE_URL,
      changeOrigin: true,
    })
  );
};