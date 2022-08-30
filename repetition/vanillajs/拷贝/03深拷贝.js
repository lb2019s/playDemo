function isObject(target) {
    return typeof target === 'object' && target !== null
}

function deepClone(target, map = new WeakMap()) {
    if (!isObject(target)) return target
    let constructor = target.constructor

    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        return new constructor(target)
    }

    if (map.has(target)) {
        return map.get(target)
    }

    let result = Array.isArray(target) ? [] : {}
    map.set(target, result)
    Reflect.ownKeys(target).forEach(key => {
        result[key] = deepClone(target[key], map)
    })

    return result
}

const a = {}
const obj = {
    name: '哇哈哈',
    age: 1,
    features: ['w', 'e', 'r'],
    parent: {
        name: '哇嘎嘎'
    },
    loop: a,
    time: new Date(),
    getName: function () { return this.name }
}

a.loop = obj

console.log(deepClone(obj))