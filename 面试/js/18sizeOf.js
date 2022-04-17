function calculator(object) {
    const objectType = typeof object
    switch (objectType) {
        case 'string':
            return object.length * 2
        case 'boolean':
            return 4
        case 'number':
            return 8
        case 'object':
            if (Array.isArray(object)) {
                return object.map(calculator).reduce(res, cur => res + cur)
            } else {
                return sizeOfObject(object)
            }
        default:
            return 0
    }
}

const seen = new WeakSet()

function sizeOfObject(object) {
    if (object === null) {
        return 0
    }
    let bytes = 0
    const keys = Reflect.ownKeys(object)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        bytes += calculator(key)
        if (typeof object[key] === 'object' && object[key] !== null) {
            if (seen.has(object[key])) {
                continue
            }
            seen.add(object[key])
        }
        bytes += calculator(object[key])
    }
    return bytes
}

const ww = {}

const testDate = {
    a: true,
    b: 'false',
    c: ww,
    d: ww,
    e: ww
}

const size = calculator(testDate)
console.log(size)