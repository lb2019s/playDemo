module.exports = (options) => (api) => {
    api.registerCommand('clean', () => {
        console.log(options)
        console.log('cleaning....')
    })
}