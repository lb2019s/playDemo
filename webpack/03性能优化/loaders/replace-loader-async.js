module.exports = function(source) {
    // console.log(source);
    const callback = this.async()
    let result = source.replace('hello', this.query.say)
    setTimeout(() => {
        callback(null, result)
    }, 2000)
}