module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',  // target host
        ws: true,  // proxy websockets
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/api': ''  // rewrite path
        }
      },
      '/analysis': {
        target: 'http://127.0.0.1:3001/',  // target host
        ws: true,  // proxy websockets
        changeOrigin: true,  // needed for virtual hosted sites
        pathRewrite: {
          '^/analysis': ''  // rewrite path
        }
      },
    }
  }
};


