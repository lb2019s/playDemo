const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const glob = require('glob')

const mpa = () => {
    const entry = {}
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.html'))
    entryFiles.forEach(entryFile => {
        const match = entryFile.match(/\/src\/(.*)\/index\.html/)
        const pageName = match[1]
        entry[pageName] = entryFile.replace('.html', '.js')
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: entryFile,
                filename: `${pageName}.html`
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = mpa()

module.exports = {
    entry,
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
            }, {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'iconfont/'
                    }
                }
            }
        ]
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    plugins: [
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: 'index-[chunkhash:8].css'
        }),
        new CleanWebpackPlugin()
    ]
}