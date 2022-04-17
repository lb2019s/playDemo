// forEach
// arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
Array.prototype._forEach = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const length = O.length >>> 0
    let k = 0
    while (k < length) {
        if (k in O) {
            callback.call(thisArg, O[k], k, O)
        }
        k++
    }
}

// map
Array.prototype._map = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }

    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }

    const O = Object(this)
    const length = O.length
    const A = new Array(length)
    let k = 0
    while (k < length) {
        if (k in O) {
            A[k] = callback.call(thisArg, O[k], k, O)
        }
        k++
    }
    return A
}

// filter
Array.prototype._filter = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const length = O.length
    let k = 0, res = []
    while (k < length) {
        if (k in O) {
            if (callback.call(thisArg, O[k], k, O)) {
                res.push(O[k])
            }
        }
        k++
    }
    return res
}

// some
Array.prototype._some = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const length = O.length
    let k = 0
    while (k < length) {
        if (k in O) {
            if (callback.call(thisArg, O[k], k, O)) {
                return true
            }
        }
        k++
    }
    return false
}

// every
Array.prototype._every = function (callback, thisArg) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const length = O.length
    let k = 0
    while (k < length) {
        if (k in O) {
            if (!callback.call(thisArg, O[k], k, O)) {
                return false
            }
        }
        k++
    }
    return true
}

// reduce
Array.prototype._reduce = function (callback, initialValue) {
    if (this == null) {
        throw new TypeError('this is null or not define')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function')
    }
    const O = Object(this)
    const length = O.length
    let k = 0
    let acc
    if (arguments.length > 1) {
        acc = initialValue
    } else {
        while (k < length && !(k in O)) {
            k++
        }
        if (k >= length) {
            throw new TypeError('reduce of empty array with no initial value')
        }
        acc = O[k++]
    }
    while (k < length) {
        if (k in O) {
            acc = callback(acc, O[k], k, O)
        }
        k++
    }
    return acc
}

const arr = [1, 2, 3, 4, 5]
// arr._forEach((item) => {
//     console.log(item)
// })
// const res = arr._map((item, index) => {
//     return {
//         key: index,
//         value: item
//     }
// })
// const res = arr._filter((item, index) => {
//     return index & 1
// })
// const res = arr._every((item) => {
//     return item < 6
// })

const res = arr._reduce((sum, cur) => cur + sum)

console.log(res)