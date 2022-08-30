const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: './src/react/index.js',
    // entry: './src/vue/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]-[hash:6].js'
    },
    mode: 'development',
    devServer: {
        port: 8000,
        open: true,
        hot: 'only'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, './src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-transform-runtime'],
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                // "@vue/babel-preset-jsx"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                include: path.resolve('src'),
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, './src'),
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                include: path.resolve('src'),
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx']
    }
}