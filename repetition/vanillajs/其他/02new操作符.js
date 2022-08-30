function myNew(constructor, ...args) {
    let obj = Object.create(constructor.prototype)
    const result = constructor.apply(obj, args)
    if (result && (typeof result === 'object' || typeof result === 'function')) {
        return result
    }
    return obj
}