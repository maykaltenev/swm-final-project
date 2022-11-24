import { createProxyMiddleware } from 'http-proxy-middleware' ;

//module.exports = function(app) {
  export default function app(){
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/quiz',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};