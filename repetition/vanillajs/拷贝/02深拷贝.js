function isObject(target) {
    return typeof target === 'object' && target !== null
}

function deepClone(target) {
    if (!isObject(target)) return target
    let result = Array.isArray(target) ? [] : {}
    Reflect.ownKeys(target).forEach(key => {
        result[key] = deepClone(target[key])
    })
    return result
}


const obj = {
    name: '哇哈哈',
    age: 1,
    features: ['w', 'e', 'r'],
    parent: {
        name: '哇嘎嘎'
    },
    getName: function () { return this.name }
}

console.log(deepClone(obj))