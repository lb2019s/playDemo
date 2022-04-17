// Object.create
Object._create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an object or null')
    }
    if (propertiesObject === null) {
        throw new TypeError('Cannot convert null to object')
    }
    const F = function () { }
    F.prototype = proto
    const obj = new F()
    if (propertiesObject) {
        Object.defineProperties(obj, propertiesObject)
    }
    if (proto === null) {
        obj.__proto__ = null
    }
    return obj
}

// Object.assign
Object._assign = function (target, ...source) {
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    const to = Object(target)
    source.forEach(nextSource => {
        for (let key in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
                to[key] = nextSource[key]
            }
        }
    })
    return to
}

const res = Object._assign({ a: 1, b: 2 }, { b: 3, c: 4 }, { d: 5 }, { hasOwnProperty: 'wa' })
// console.log(res)


// Object.is
Object._is = function (x, y) {
    if (x === y) {
        return x !== 0 || 1 / x === 1 / y
    } else {
        return x !== x && y !== y
    }
}

console.log(Object._is(0, -0))
console.log(Object._is(NaN, NaN))