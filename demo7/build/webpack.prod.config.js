const path = require('path')
const baseWebpackConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge');

const prodWebPackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css|.less$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']//处理css
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash].css",
      chunkFilename: "[id].[chunkhash].css"
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: 'index.html',
      inject: true, // script标签位于html文件的 body 底部
      minify: {
        removeComments: true, // 去除注释
        collapseWhitespace: true, // 去空格
        removeAttributeQuotes: true // 移除属性的引号 
      },
    }),
  ]
})

module.exports = prodWebPackConfig;