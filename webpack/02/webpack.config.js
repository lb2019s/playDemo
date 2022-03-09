const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TxtWebpackPlugin = require('./plugins/txt-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    // entry: {
    //     'index': './src/index.js',
    //     'login': './src/login.js'
    // },
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            // {
            //     test: /\.less$/,
            //     use: ['kkb-style-loader', 'kkb-css-loader', 'postcss-loader', 'kkb-less-loader']
            // // },
            // {
            //     test: /.js$/,
            //     use: [
            //         // path.resolve(__dirname, './loaders/replace-loader.js'),
            //         'replace-loader',
            //         {
            //             loader: 'replace-loader-async.js',
            //             options: {
            //                 say: '哇哈哈'
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /.(png|jpe?g|gif)$/,
            //     // use: ['file-loader']
            //     use: {
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'images/'
            //         }
            //     }
            // }
            {
                test: /.(png|jpe?g|gif)$/,
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
        // new HtmlWebpackPlugin({
        //     template: './index.html',
        //     filename: 'login.html',
        //     chunks: ['login']
        // }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new TxtWebpackPlugin()
    ],
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