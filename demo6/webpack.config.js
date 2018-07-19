const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

const webpackConfig = {
  entry: APP_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  devServer: {
    inline: true, // 打包后加入一个websocket客户端
    hot: true, // 热更新
    contentBase: BUILD_PATH, // 开发服务运行时的文件根目录
    host: 'localhost',
    port: 9090,
    compress: true // 开启启动gzip压缩
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['build'])
  ],

}

module.exports = webpackConfig