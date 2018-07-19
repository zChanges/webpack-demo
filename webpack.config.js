const webpack = require('webpack');
const path = require('path');

// __dirname node的全局变量，指向当前执行脚本的所在目录
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PACH = path.resolve(ROOT_PATH, 'build');
console.log(__dirname);
console.log(ROOT_PATH)

const webpackConfig = {
  // 入口文件
  entry: APP_PATH,
  // 输出文件
  output: {
    path: BUILD_PACH,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css|\.less$/,
        use: ['style-loader','css-loader']
      },
    ]
  },
  plugins:[]
}

module.exports = webpackConfig;