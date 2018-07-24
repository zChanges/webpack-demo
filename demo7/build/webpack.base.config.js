
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MAIN_PATH = path.resolve(SRC_PATH, 'main.js')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    app: MAIN_PATH
  },
  output: {
    path: DIST_PATH,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'], // 自动解析已确定的扩展文件名称
    alias: {  // 设置别名
      '@': SRC_PATH
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [SRC_PATH]
      },  
      {
        test: /\.css|.less$/,
        use: ['vue-style-loader','css-loader','less-loader'],
      }
    ]
  },
  plugins:[
		new VueLoaderPlugin()
  ]
}