const files = require.context('./', false, /\.vue$/)

const configs = files.keys().reduce((configs, key) => {
    const config = files(key)
    configs[config.default.name] = config.default
    return configs
}, {})

export { configs }