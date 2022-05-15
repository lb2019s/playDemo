Promise.resolve = function (value) {
    if (value && value instanceof Promise) {
        return value
    }
    return new Promise(resolve => resolve(value))
}