

function defineProperty(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log('get', key)
            return val
        },
        set(newVal) {
            if (val !== newVal) {
                console.log('newVal', key, newVal)
                observe(newVal)
                val = newVal
            }
        }
    })
}

function set(obj, key, val) {
    defineProperty(obj, key, val)
}

function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineProperty(obj, key, obj[key])
    })
}

let obj = {
    foo: 'foo',
    oop: 'oop',
    biz: {
        a: 3
    },
    arr: [1, 2, 3]
}

observe(obj)

// obj.foo
// obj.foo = 'oof'
// obj.oop
// obj.oop = 'poo'
// obj.biz.a = 1234
// obj.biz = {
//     a: 0000
// }

// obj.biz.a = 9999

// obj.doog = 'oooo'
set(obj, 'doog', 'doog')
obj.doog

obj.arr.push('4')