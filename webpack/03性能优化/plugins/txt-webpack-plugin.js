class TxtWebpackPlugin {
    constructor() { }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('txt-webpack-plugin', (compilation, cb) => {
            const info = {}
            const names = Object.keys(compilation.assets)
            info.number = names.length
            info.names = names
            compilation.assets['info.txt'] = {
                source: () => {
                    return JSON.stringify(info)
                },
                size: () => {
                    return 1024
                }
            }
            cb()
        })

        compiler.hooks.compile.tap('txt-webpack-plugin', compilation => {
            console.log('this is compiler');
        })
    }
}

module.exports = TxtWebpackPlugin