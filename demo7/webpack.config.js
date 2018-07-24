const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')

const webPackBaseConfig = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	output: {
		path: DIST_PATH,
		filename: '[name].js'
	},
	devServer: {
		inline: true,
		progress: true, 
    host: 'localhost',
		port: 5050,
    compress: true // 开启启动gzip压缩
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
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
		}),
		new VueLoaderPlugin(),
	]
}

module.exports = webPackBaseConfig