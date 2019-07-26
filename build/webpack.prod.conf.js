// 向外暴露一个打包配置对象 node语法，webpack基于node构建
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
// 压缩类插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// css文件抽离成单独样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

const prodConfig = {
    mode: 'production', 
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'js/bundle.[hash].js'
    },
    module: {  //第三方文件的配置规则
      rules: [  
        // css loader 读取第三方的css文件
        { 
          test: /\.css$/, use: [
            MiniCssExtractPlugin.loader, 
            'css-loader'
        ]
        }, 
        // 自定义的样式全部使用sass编写
        { test: /\.scss$/, use: [
          MiniCssExtractPlugin.loader, 
        {
          loader: 'css-loader',
          options: {
            modules: true
          }
        },
        {    //自动添加前缀
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: loader => [
              // 生产环境要使用这个名字overrideBrowserslist
              require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN'] }) // 添加前缀
            ]
          }
        }, 
        'sass-loader'
      ]} //配置sass-loader
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        title: 'Find Music',
        template: path.join(__dirname, '../src/index.html'), //指定内存中的模板页面路径
        filename: 'index.html',  //指定内存中模板页面的文件名
        minify: {
          collapseWhitespace: true,   //移除多余空格
          removeComments: true,       //移除注释
          removeAttributeQuotes: true // 移除属性的引号
        }
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css', // 设置最终输出的文件名
        chunkFilename: '[id].[hash].css'
      })
    ],
    // 压缩工具
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,      //是否开启缓存，js文件没有发生变化时不进行压缩
          parallel: true    //并行压缩
        }),
        new OptimizeCssAssetsPlugin()
      ]
    },
}

module.exports = merge(baseConfig, prodConfig)