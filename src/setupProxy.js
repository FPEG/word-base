const proxy = require('http-proxy-middleware');
module.exports = function(app) {

  app.use(
    '/api',
    proxy({
      target: 'http://192.168.2.114',
      changeOrigin: true,
    })
  );

  app.use(
    '/dapi',
    proxy({
      target: 'http://localhost:9101',
      changeOrigin: true,
      pathRewrite: {
        '^/dapi/' : '/'           
    },
    })
  );

  if(process.env.NODE_ENV==='production')
  {
    app.use(
      '/',
      proxy({
        pathRewrite: {
          '^/' : '/WordBase'            
      },
      })
    );
  }
  
};