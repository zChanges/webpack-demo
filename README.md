# webpack入门

## 基础配置

> - `entry` 入口
> - `output` 出口，输出的文件
> - `module` 模块，处理模块
> - `plugins` 插件

## 入口和出口文件(`entry | output`)

- `entry` 默认为 `./src/index.js`
- `output`默认为 `./dist/main.js`  // 必须是绝对路径
- `mode`设置模式`production(js压缩)`和`development(不压缩)` 生产环境和开发环境

```js
  "scripts": {
    "dev": "webpack --mode development ./src/main.js --output ./dist/index.js",
    "build": "webpack --mode production ./src/main.js --output ./dist/index.js"
  },
```

> `entry` 接受这三种形式的值`[字符串、对象、数组]`
> - 字符串：正常的入口路径 等同于`entry: { main: '入口路径' }`
> - 数组：打包数组中的文件可以是插件
> - 对象：`key:value` `key`打包后的名称,也可以是路径 、 `value`字符串：路径或插件名称 数组：[入口文件,插件名称]

```js
const path = require('path')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

const webpackConfig = {
  entry: APP_PATH,
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
```

## `module`

> 设置模块中文件的处理

### js设置兼容

- 安装`yarn add babel-core  babel-preset-env babel-loader -D`
- `babel-core` babel的核心库
- [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env) 将你设置的运行环境下转译代码(`env`下2015、2016、2017)或设置`browsers`

```js
  // webpack.config.js
  const path = require('path')
  const ROOT_PATH = path.resolve(__dirname)
  const APP_PATH = path.resolve(ROOT_PATH, 'src');
  const BUILD_PATH = path.resolve(ROOT_PATH, 'build')
  const webpackConfig = {
    entry: ["babel-polyfill", APP_PATH ],
    output: {
      path: BUILD_PATH,
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modulse/,
        use: {
          loader: "babel-loader"
        }
      }]
    }
  }

  module.exports = webpackConfig

  // .babelrc
  {
   "presets": [
      "env"
   ]
  }

  //package.json
  ...
  "scripts": {
    "dev": "webpack --mode development --module-bind js=babel-loader",
    "build": "webpack --mode production --module-bind js=babel-loader"
  },
  ...
```

### 处理css

> webpack不会把css提取到单独文件
- 安装`yarn add style-loader css-loader -D`
- 安装`yarn add mini-css-extract-plugin -D`(4.4.1版本)之前采用`extract-text-webpack-plugin`(单独提取处css)

```html
<link rel="stylesheet" href="main.css">
<body style='border: 1px solid #000'>
</body>
</html>
<script src="bundle.js"></script>
```

```js
module: {
    rules: [
      ...
      {
        test: /\.css$/,
        // use: [ 'style-loader', 'css-loader' ]//处理css
        use: [ MiniCssExtractPlugin.loader, 'css-loader']//处理css
      }
      ...
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
```

### less

- 安装`yarn add less-loader less -D`

```less
@import './style.css';
@import './common.css';
@padding: 20px;

body{
  padding-top: @padding;
  div{
    padding-left: @padding * 2;
  }
}
```

```js
  // index.js
  import './less.less';
  const div = document.createElement('div');
  div.innerHTML = 'webpack';
  document.body.appendChild(div)

  // webpack.config.js
  module: {
    rules: [
      {
        test: /\.css|.less$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader','less-loader']
      },
    ]
  },
```

### html

> 生成html，自动引入js css 不需要手动添加
- 安装`yarn add html-webpack-plugin html-loader -D`

```js
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')

const webpackConfig = {
 
  module: {
    rules: [
      ...
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true } // 压缩
          }
        ]
      }
      ...
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      // title:'webpack-demo5',
      // filename: "./index.html",
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
}

module.exports = webpackConfig
```

## 开启`devServer`

- 安装`yarn webpack-dev-server -D`
- `--hot` 开启热更新

> *在`index.html`中引入的`script`路径不是配置出口的地址，是内存路径,不在物理硬盘上,默认是`/`,也就是`<script src="main.js"></script>`*

```html
<!DOCTYPE html>
<html lang="en">
<head>
  ...
</head>
<body>
  
</body>
</html>
<script src="main.js"></script>
```

```js
  "scripts": {
    "dev": "webpack-dev-server --mode development"
  },
```

```js
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  ...
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
    new webpack.HotModuleReplacementPlugin()
  ],
  ...
}

module.exports = webpackConfig
```

### 删除文件

- 安装`yarn add clean-webpack-plugin -D`

```js
  ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']) // 删除dist文件
  ],
  ...
```

## Vue配置

### 公共部分

> - 入口出口
> - 配置一些loader
> - 定义扩展名

```js
// webpack.base.config.js


const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../')
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const MAIN_PATH = path.resolve(SRC_PATH, 'main.js')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    app: MAIN_PATH // 入口地址
  },
  output: { // 出口
    path: DIST_PATH,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue'], // 自动解析已确定的扩展文件名称
    alias: {  // 设置别名
      '@': SRC_PATH
    }
  },
  module: { // 定义的loader
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
        // vue-loader的使用都是需要伴生 VueLoaderPlugin
  ]
}
```

### 开发环境

> - 启动服务
> - 自动生成index.html
> - 开发环境的devtool [具体参考](http://webpack.css88.com/configuration/devtool.html)

```js
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge');
const devWebPackConfig = merge(baseWebpackConfig,{
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',  
  // http://webpack.css88.com/configuration/devtool.html
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
```

### 生产环境

> - 提取css 可预先加载css
> - 自动生成html 并压缩删除注释等
> - 出口文件添加hash值清理缓存
> - 设置devtool：source-map 生成一个单独的map文件，并在出口文件添加注释 （用来调试）

```js
// webpack.prod.config.js
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
```