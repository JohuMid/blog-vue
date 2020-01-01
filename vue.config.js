module.export = {
  proxyTable: {
    '/': {                                // 要代理的接口名
      target: 'http://127.0.0.1:3000/',   // 要代理的接口地址
      changeOrigin: true,                            // 允许跨域
      pathRewrite: {'/': ''}            // 接口名重写
    },
  }

}