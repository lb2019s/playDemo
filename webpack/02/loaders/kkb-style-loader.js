module.exports = function(source) {
    const result = `
        const style = document.createElement('style')
        style.innerHTML = ${source}
        document.head.appendChild(style)
    `
    return result
}