// 向外暴露一个打包配置对象 node语法，webpack基于node构建
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
// 发布重新生成dist插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 配置html插件
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './src/index.html'), //指定内存中的模板页面路径
    filename: 'index.html'  //指定内存中模板页面的文件名
})



// webpack默认只能打包处理.js后缀名类型的文件，类似.png .vue 文件无法主动处理，所以需要配置第三方处理loader
module.exports = {
    mode: 'production', // development
    // devtool: 'source-map',
    plugins: [
      htmlPlugin,
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
        new OptimizeCssAssetsPlugin()
      ]
    },
    entry: path.join(__dirname, './src/index.js'),
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'js/bundle.js'
    },
    module: {  //第三方文件的配置规则
        rules: [  //第三方匹配规则
          { test: /\.js|jsx$/, use: 'babel-loader', exclude:/node_modules/}, //配置loader一定要添加exclude排除项
          { test: /\.css$/, use: ['style-loader', 'css-loader']}, //从webpack2开始loader不能省略
          { test: /\.scss$/, use: ['style-loader', 'css-loader?modules', 'sass-loader']} //配置sass-loader
        ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名可以不写，遇到时会自动补全，其中js和json不写是默认补全的 
      alias: {
        '@': path.join(__dirname, './src') //用@符号表示src路径
      }
    }
}
