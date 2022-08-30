function isObject(target) {
    return target && typeof target === "object"
}

function shallowCopy(target) {
    if (!isObject(target)) return target
    let result = Array.isArray(target) ? [] : {}
    Reflect.ownKeys(target).forEach(key => {
        result[key] = target[key]
    })
    return result
}