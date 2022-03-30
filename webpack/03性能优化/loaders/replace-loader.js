module.exports = function(source) {
    console.log(source);
    const result = source.replace('老汉', '含名扬')
    // return result
    this.callback(null, result)
}