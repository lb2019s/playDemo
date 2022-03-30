const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')

const prodConfig = {
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name]-[hash:8].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, './src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                include: path.resolve(__dirname, './src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/index-[chunkhash:8].css'
        })
    ],
    optimization: {
        usedExports: true,
    },
}

module.exports = merge(baseConfig, prodConfig)