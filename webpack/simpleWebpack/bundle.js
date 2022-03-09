const Webpack = require('./lib/webpack')
const config = require('./webpack.config')
const compiler = new Webpack(config)
compiler.run()