const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    module: {
        rules: [
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
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['main']
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        modules: [path.resolve(__dirname, './node_modules')],
        extensions: ['.js', '.json', 'jsx', 'vue'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
}