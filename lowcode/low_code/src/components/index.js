const models = require.context('./', false, /\.vue$/)
const parseFiles = require.context('./', false, /parse[^.]+\.js$/)

const components = models.keys().reduce((components, key) => {
    const model = models(key)
    components[model.default.name] = model.default
    return components
}, {})

const parses = parseFiles.keys().reduce((parses, key) => {
    const parse = parseFiles(key)
    parses[parse.default.name] = parse.default
    return parses
}, {})

export { components, parses }