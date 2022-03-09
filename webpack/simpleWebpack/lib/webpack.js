const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

module.exports = class Webpack {
    constructor(options) {
        this.entry = options.entry
        this.output = options.output
    }
    run() {
        this.modules = []
        const info = this.parse(this.entry)
        this.modules.push(info)
        for (let i = 0; i < this.modules.length; i++) {
            let { entryPath, dependencies, code } = this.modules[i]
            if (dependencies) {
                for (let key in dependencies) {
                    this.modules.push(this.parse(dependencies[key]))
                }
            }
        }
        const graph = {}
        this.modules.forEach(({ entryPath, dependencies, code }) => {
            graph[entryPath] = {
                dependencies,
                code
            }
        })
        this.renderFile(graph)
    }
    parse(entryPath) {
        const content = fs.readFileSync(entryPath, 'utf-8')
        const ast = parser.parse(content, {
            sourceType: 'module'
        })
        const dependencies = {}
        traverse(ast, {
            ImportDeclaration: ({ node }) => {
                const importPath = node.source.value
                const newPath = './' + path.join('.', path.dirname(entryPath), importPath).replaceAll('\\', '/')
                console.log('newPath', newPath);
                dependencies[importPath] = newPath;
            }
        })
        const { code } = babel.transformFromAstSync(ast, null, {
            presets: ['@babel/preset-env']
        })
        return {
            entryPath,
            dependencies,
            code
        }
    }
    renderFile(graph) {
        // console.log(graph);
        const outputPath = path.resolve(this.output.path, this.output.filename)
        const code = `
;(function(modules){
    function require(module) {
        function newRequire(relativePath) {
            return require(modules[module].dependencies[relativePath])
        }
        const exports = {}
        ;(function (require, exprots, code) {
            eval(code)
        })(newRequire, exports, modules[module].code)
        return exports
    }
    require("${this.entry}")
})(${JSON.stringify(graph)})
        `
        fs.writeFileSync(outputPath, code)
    }
}