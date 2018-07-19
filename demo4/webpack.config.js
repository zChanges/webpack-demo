const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modulse/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css|.less$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader','less-loader']//处理css
      },
      
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}

module.exports = webpackConfig