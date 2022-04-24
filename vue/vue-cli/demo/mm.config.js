const CleanPlugin = require('./plugins/clean')

module.exports = {
    plugins: {
        commands: [
            CleanPlugin('hello clean')
        ]
    }
}