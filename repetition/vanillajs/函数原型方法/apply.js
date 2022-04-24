// repeat 2
Function.prototype._apply = function (context, args) {
    context = context || window
    const fn = Symbol()
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}

const res = Math.max._apply(null, [1, 2, 3, 1, 2, 6, 9])
console.log(res)