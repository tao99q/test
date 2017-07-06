var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [{
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
        query: {
          "presets": ["latest"]
        }
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader!postcss-loader'
        use: [
          'style-loader', 'css-loader?importLoaders=1', 'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 'postcss-loader', 'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'postcss-loader', 'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: 'body'
    })
  ],
  devServer: {
    contentBase: "./dist", //本地服务器所加载的页面所在的目录
    colors: true, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转
    inline: true //实时刷新
  }
}
