
// vue.config.js
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
module.exports = {
    css: {
        extract: false
    },
    outputDir: './dist/' + target,
    configureWebpack: () => ({
        // 将 entry 指向应⽤用程序的 server / client ⽂文件
        entry: TARGET_NODE ? `./src/entry-${target}.js` : './src/main.js', // 对 bundle renderer 提供 source map ⽀支持
        devtool: 'source-map',
        target: TARGET_NODE ? "node" : "web",
        node: TARGET_NODE ? undefined : false,
        output: {
            libraryTarget: TARGET_NODE ? "commonjs2" : undefined
        },
        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // 外置化应⽤用程序依赖模块。可以使服务器器构建速度更更快，
        // 并⽣生成较⼩小的 bundle ⽂文件。
        externals: TARGET_NODE
            ? nodeExternals({
                // 不不要外置化 webpack 需要处理理的依赖模块。
                // 你可以在这⾥里里添加更更多的⽂文件类型。例例如，未处理理 *.vue 原始⽂文件， // 你还应该将修改 `global`(例例如 polyfill)的依赖模块列列⼊入⽩白名单

                allowlist: [/\.css$/] //  Error: [webpack-node-externals] : Option 'whitelist' is not supported. Did you mean 'allowlist'?
            })
            : undefined,
        optimization: {
            splitChunks: TARGET_NODE ? false : undefined    //  Error: Server-side bundle should have one single entry file. Avoid using CommonsChunkPlugin in the server config.
        },
        plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new
            VueSSRClientPlugin()]
    }),
    chainWebpack: config => {
        if (TARGET_NODE) {
            config.optimization.delete('spliteChunks')
        }
        config.module
            .rule("vue")
            .use("vue-loader")
            .tap(options => {
                merge(options, {
                    optimizeSSR: false
                });
            });
    }
};