// 向外暴露一个打包配置对象 node语法，webpack基于node构建
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')// webpack默认只能打包处理.js后缀名类型的文件，类似.png .vue 文件无法主动处理，所以需要配置第三方处理loader
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

let devConfig = {
    mode: 'development', // development
    devtool: 'source-map',  //js文件开启source-map
    // 配置开发模式的服务器设置
    devServer: {  
      clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
      // hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
      contentBase:  path.join(__dirname, "../dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
      compress: true, // 一切服务都启用gzip 压缩
      host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
      port: 8520, // 端口
      open: true, // 是否打开浏览器
      overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
        warnings: true,
        errors: true
      },
      publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
      proxy: {  // 设置代理
        // }
      },
      quiet: false, //  启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    },
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.join(__dirname, '../src/index.html'), //指定内存中的模板页面路径
        filename: 'index.html',  //指定内存中模板页面的文件名
      }),
      // new webpack.HotModuleReplacementPlugin(),
    ],
    module: {  //第三方文件的配置规则
      // 这里的配置写成字符串形式默认在页面上是以内联样式的形式注入的，所以刷新页面不会重新请求样式内容导致页面加载完成样式未完成的情况
        rules: [ 
          // css loader 读取第三方的css文件
          { 
            test: /\.css$/, use: [
              'style-loader','css-loader'
          ]
          }, 
          // 自定义的样式全部使用sass编写
          { test: /\.scss$/, use: [
            'style-loader', 'css-loader?modules','sass-loader'
        ]} 
        ]
    }
}

module.exports = merge(baseConfig, devConfig)