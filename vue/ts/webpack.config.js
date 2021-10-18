const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    devtool: 'eval-cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?/i,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
           template: './public/index.html' 
        })
    ],
    mode: 'development'
}