const path = require('path')
const webpack = require('webpack')

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const devConfig = {
    output: {
        path: path.resolve(__dirname, './dev'),
        filename: '[name]-[hash:8].js'
    },
    mode: 'development',
    devtool: 'source-map',
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
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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

module.exports = merge(baseConfig, devConfig)