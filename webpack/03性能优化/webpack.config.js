const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TxtWebpackPlugin = require('./plugins/txt-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]-[hash:8].js'
    },
    mode: 'development',
    devtool: 'none',
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, './src'),
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, './src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /.(png|jpe?g|gif)$/,
                include: path.resolve(__dirname, './src'),
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        limit: 2048,    // KB
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                include: path.resolve(__dirname, './src'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'iconfont/'
                    }
                }
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index-[chunkhash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new TxtWebpackPlugin()
    ],
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')],
        extensions: ['.js', '.json', 'jsx', 'vue'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        },
        hotOnly: true
    }
}