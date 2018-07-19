const path = require('path')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

const webpackConfig = {
  entry:APP_PATH,
  // entry: {
  //   index: APP_PATH,
  //   vendors: [APP_PATH,jquery]
  // },
  // entry: [APP_PATH, 'jquery'],
  output: {
    path: BUILD_PATH,
    filename: '[name]-bundle.js'
  }
}

module.exports = webpackConfig