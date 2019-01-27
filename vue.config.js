module.exports = {
  // 基本Url
  baseUrl            : process.env.NODE_ENV === 'production' ? '././' : '/',
  // 打包路径
  outputDir          : 'consumer',
  // 打包的时候将pages的注释解开
  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  pages: {
    addPager: {
      // page 的入口
      entry: "src/pages/addPager/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "addPager.html",
      // 当使用 title 选项时，
      title: "补纸"
    },
    buyDevice: {
      // page 的入口
      entry: "src/pages/buyDevice/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "buyDevice.html",
      // 当使用 title 选项时，
      title: "设备购买"
    },
    deviceBind: {
      // page 的入口
      entry: "src/pages/deviceBind/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "deviceBind.html",
      // 当使用 title 选项时，
      title: "终端绑定"
    },
    personnelBind: {
      // page 的入口
      entry: "src/pages/personnelBind/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "personnelBind.html",
      // 当使用 title 选项时，
      title: "人员绑定"
    },
    testOutPaper: {
      // page 的入口
      entry: "src/pages/testOutPaper/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "testOutPaper.html",
      // 当使用 title 选项时，
      title: "测试出纸"
    }
  },
  // 不打包Map
  productionSourceMap: false,
  devServer          : {
    disableHostCheck: true,
    port            : 9090,
    // 跨域代理
    proxy           : {
      '/wx': {
        target      : 'http://mp.bp.zcloudtechs.cn',
        // target: 'http://192.168.10.123:8090',
        ws          : true,
        changeOrigin: true
      }
    }
  },
  // webpack配置
  chainWebpack       : config => {
    // 使用cnpm可能会导致热更新失效，设置可恢复热更新
    config.resolve.symlinks(true);
    return config;
  }
};
