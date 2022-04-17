const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'main.js',
        // publicPath: './'
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        port: 3000,
        hot: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    filename: 'vendor.js',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
                }
            }
        }
    }
}