// 向外暴露一个打包配置对象 node语法，webpack基于node构建
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack默认只能打包处理.js后缀名类型的文件，类似.png .vue 文件无法主动处理，所以需要配置第三方处理loader

const baseConfig = {
    entry: path.join(__dirname, '../src/index.js'),
    resolve: {
      extensions: ['.js', '.jsx', '.json'], //表示这几个文件的后缀名可以不写，遇到时会自动补全，其中js和json不写是默认补全的 
      alias: {
        '@': path.join(__dirname, '../src') //用@符号表示src路径
      }
    },
    plugins: [
      new CleanWebpackPlugin()
    ],
    module: {  //第三方文件的配置规则
        rules: [  
          { test: /\.js|jsx$/, use: 'babel-loader', exclude:/node_modules/}, //配置loader一定要添加exclude排除项
        ]
    },
}

module.exports = baseConfig