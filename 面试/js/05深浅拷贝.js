function shallowCopy(target) {
    if (typeof target !== 'object') return target
    const result = Array.isArray(target) ? [] : {}
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            result[key] = target[key]
        }
    }
    return result
}

function deepClone(target) {
    if (typeof target !== 'object') return target
    const result = Array.isArray(target) ? [] : {}
    for (let key in target) {
        if (target.hasOwnProperty(key)) {
            result[key] = typeof target[key] === 'object' ? deepClone(target[key]) : target[key]
        }
    }
    return result
}

// 考虑循环引用 一些内置对象
function deepClone(target, map = new Map()) {
    if (typeof target !== 'object') return target
    if (map.has(target)) {
        return target
    }

    const constructor = target.constructor
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        return new constructor(target)
    }

    if (isObject(target)) {
        map.set(target, true)
        const result = Array.isArray(target) ? [] : {}
        Reflect.ownKeys(target).forEach((key) => {
            if (isObject(target[key])) {
                result[key] = deepClone(target[key], map)
            } else {
                result[key] = target[key]
            }
        })
        return result
    }

    return target
}

function isObject(obj) {
    return typeof obj === 'object' && obj !== null
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

const obj1 = shallowCopy(obj)
const obj2 = deepClone(obj)
console.log(obj1)
console.log(obj2)

// 利用messageChannel
function deepCopy(obj) {
    return new Promise((resolve) => {
        const { port1, port2 } = new MessageChannel();
        port2.onmessage = ev => resolve(ev.data);
        port1.postMessage(obj);
    });
}

deepCopy(obj).then((copy) => {           // 请记住`MessageChannel`是异步的这个前提！
    let copyObj = copy;
    console.log(copyObj, obj)
    console.log(copyObj == obj)
});