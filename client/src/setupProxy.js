const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
 /*  app.use(
    createProxyMiddleware(["/user"], { target: "http://localhost:5000" })
  ); */
   app.use('/user',
     createProxyMiddleware({
     target: 'http://localhost:5000',
       changeOrigin: true,
    })
   );

  //  app.use(
  //   '/questions',
  //   createProxyMiddleware({
  //     target: 'http://localhost:5000',
  //     changeOrigin: true,
  //   })
  // );
};
