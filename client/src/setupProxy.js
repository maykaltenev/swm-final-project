import { createProxyMiddleware } from 'http-proxy-middleware';

export const proxyFunction = (app) =>  {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  
};