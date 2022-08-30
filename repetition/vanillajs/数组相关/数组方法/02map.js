Array.prototype._map = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }

    const O = Object(this)
    const len = O.length >>> 0
    let k = 0
    const result = new Array(len)
    while (k < len) {
        if (k in O) {
            result[k] = callback.call(thisArg, O[k], k, O)
        }
        k++
    }
    return result
}

Array.prototype._map = function (callback, thisArg) {
    return this.reduce((result, item, index, O) => result.concat(callback.call(thisArg, item, index, O)), [])
}

const arr = [1, 2, 3, 4, 5]

const res = arr._map((item, index) => {
    return {
        key: index,
        value: item
    }
})

console.log(res)