Array.prototype._forEach = function (callback, thisArg) {
    for (let [index, item] of this.entries()) {
        callback.call(thisArg, item, index, this)
    }
}

Array.prototype_forEach = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }

    const O = Object(this)
    const length = O.length >>> 0
    let k = 0
    while (k in length) {
        if (O.hasOwnProperty(k)) {
            callback.call(thisArg, O[k], k, O)
        }
        k++
    }
}

const arr = [1, 2, 3, 4, 5]
arr._forEach((item) => {
    console.log(item)
})