function defineReactive(obj, key, val) {
    observe(val)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get() {
            // console.log('get', key)
            Dep.target && dep.addDep(Dep.target)
            return val
        },
        set(newVal) {
            if (val !== newVal) {
                // console.log('newVal', key, newVal)
                observe(newVal)
                val = newVal

                // watchers.forEach(w => w.update())
                dep.notify()
            }
        }
    })
}

function observe(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return
    }
    new Observer(obj)
}

function proxy(vm, sourceKey) {
    Object.keys(vm[sourceKey]).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm[sourceKey][key]
            },
            set(newVal) {
                vm[sourceKey][key] = newVal
            }
        })
    })
}

class KVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        proxy(this, '$data')
        observe(this.$data)
        new Compiler(options.el, this)
    }
}

const originProto = Array.prototype;
const arrayProto = Object.create(originProto);
['pop', 'push', 'shift', 'unshift', 'splice'].forEach(method => {
    arrayProto[method] = function () {
        originProto[method].apply(this, arguments);
        console.log('数组执行' + method + '操作')
    }
})

class Observer {
    constructor(data) {
        this.data = data
        if (Array.isArray(data)) {
            this.walkArr()
        } else {
            this.walk()
        }
    }

    walk() {
        let obj = this.data
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
    walkArr() {
        let arr = this.data
        arr.__proto__ = arrayProto;
        for (let i = 0; i < arr.lenght; i++) {
            observe(arr[i])
        }
    }
}

// const watchers = [];
class Watcher {
    constructor(vm, key, updateFn) {
        this.$vm = vm;
        this.key = key;
        this.updateFn = updateFn;

        // watchs.push(this)
        Dep.target = this;
        this.$vm[key];
        Dep.target = null;
    }
    update() {
        this.updateFn.call(this.$vm, this.$vm[this.key])
    }
}

// Dep 依赖收集
class Dep {
    constructor() {
        this.deps = [];
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(w => w.update())
    }
}