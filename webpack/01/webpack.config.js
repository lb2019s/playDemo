const path = require('path')
const HtmlWebpackPugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // entry: "./src/index.js",
    entry: {
        'index': './src/index.js',
        'other': './src/a.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]-[hash:8].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPugin({
            template: './src/index.html',
            filename: 'index-[hash:8].html'
        }),
        new CleanWebpackPlugin()
    ]
}