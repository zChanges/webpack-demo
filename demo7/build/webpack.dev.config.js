const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const devWebPackConfig = merge(baseWebpackConfig,{
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',  // http://webpack.css88.com/configuration/devtool.html
  devServer: {
		inline: true,
		progress: true, 
    host: 'localhost',
		port: 5050,
    compress: true // 开启启动gzip压缩
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})


module.exports = devWebPackConfig