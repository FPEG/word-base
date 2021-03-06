const proxy = require('http-proxy-middleware');
module.exports = function(app) {

  app.use(
    '/api',
    proxy({
      target: 'http://localhost',
      changeOrigin: true,
    })
  );

  app.use(
    '/dapi',
    proxy({
      target: 'http://localhost:9101',//gateway socket
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