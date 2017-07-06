const webpack = require('webpack');
module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  module: {
    loaders: [{
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader?modules!postcss'
        use: [
          'style-loader', 'css-loader?importLoaders=1', 'postcss-loader'
        ]
      } //这里添加PostCSS
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        devServer: {
          contentBase: "./public", //本地服务器所加载的页面所在的目录
          colors: true, //终端中输出结果为彩色
          historyApiFallback: true, //不跳转
          inline: true //实时刷新
        }
      }
    })
  ]
}
