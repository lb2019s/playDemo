// repeat 2
Function.prototype._call = function (context, ...args) {
    context = context || window
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

const obj = {
    0: 1,
    1: 2,
    length: 2
}

let res
res = Array.prototype.reduce._call(obj, (sum, cur) => sum + cur, 0)
console.log(res)