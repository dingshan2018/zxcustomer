module.exports = {
  // 基本Url
  baseUrl: process.env.NODE_ENV === 'production' ? '././' : '/',
  // 打包路径
  outputDir: 'consumer',
  // 打包的时候将pages的注释解开
  /*pages: {
    paperOutput: {
      // page 的入口
      entry: 'src/pages/paperOutput/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'paperOutput.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'paperOutput'
    },
    deviceBind: {
      // page 的入口
      entry: 'src/pages/deviceBind/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'deviceBind.html',
      // 当使用 title 选项时，
      title: 'deviceBind'
    },
    buyDevice: {
      // page 的入口
      entry: 'src/pages/buyDevice/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'buyDevice.html',
      // 当使用 title 选项时，
      title: 'buyDevice'
    },
  },*/
  // 不打包Map
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    port: 9090,
    // 跨域代理
    /* proxy: {
      '/web-unified': {
        // target: 'http://192.168.10.34:8080',
        // target: 'http://192.168.10.123:8090',
        ws: true,
        changeOrigin: true
      }
    } */
  },
  // webpack配置
  chainWebpack: config => {
    // 使用cnpm可能会导致热更新失效，设置可恢复热更新
    config.resolve.symlinks(true);
    return config;
  }
};
