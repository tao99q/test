var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
module.exports = {
    context: __dirname,
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader!postcss-loader'
                use: [
                    'style-loader', 'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', 'css-loader', 'less-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: "url-loader?limit=8192"
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
