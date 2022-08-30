function isObject(target) {
    return target && typeof target === 'object'
}

let targetMap = new WeakMap()
let activeEffect


function track(target, key) {
    let depMap = targetMap.get(target)
    if (!depMap) targetMap.set(target, (depMap = new Map))
    let dep = depMap.get(key)
    if (!dep) depMap.set(key, (dep = new Set()))
    trackEffect(dep)
}

function trackEffect(dep) {
    if (!dep.has(activeEffect)) dep.add(activeEffect)
}

function trigger(target, key) {
    const depMap = targetMap.get(target)
    if (!depMap) return
    depMap.get(key)?.forEach(effect => effect && effect.run())
}

function reactive(data) {
    if (!isObject(data)) {
        return data
    }
    return new Proxy(data, {
        get(target, key, receiver) {
            let ret = Reflect.get(target, key, receiver)
            track(target, key)
            return isObject(ret) ? reactive(ret) : ret
        },
        set(target, key, newVal, receiver) {
            let ret = Reflect.set(target, key, newVal, receiver)
            trigger(ret)
            return ret
        },
        deleteProperty(target, key) {
            let ret = Reflect.deleteProperty(target, key)
            trigger(ret)
            return ret
        },
        has(target, key) {
            return Reflect.has(target, key)
        },
        ownKeys(target) {
            return Reflect.ownKeys(target)
        }
    })
}

function ref(value) {
    return new RefImpl(value)
}

class RefImpl {
    constructor(value) {
        this.__value = value
    }
    get value() {
        track(this, "value")
        return this.__value
    }
    set value(newVal) {
        this.__value = newVal
        trigger(this, "value")
    }
}

function effect(fn, options = {}) {
    let __effect = new ReactiveEffect(fn)
    if (!options.lazy) {
        __effect.run()
    }
    return __effect
}

function computed(fn) {
    const __effect = effect(fn, { lazy: true })
    let __computed = {
        get value() {
            return __effect.run()
        }
    }
    return __computed
}

class ReactiveEffect {
    constructor(fn) {
        this.fn = fn
    }
    run() {
        activeEffect = this
        return this.fn()
    }
}

function mount(instance, el) {
    effect(() => {
        instance.$data && update(instance, el)
    })

    instance.$data = instance.setup()
    update(instance, el)
    function update(instance, el) {
        el.innerHTML = instance.render()
    }
}


export {
    reactive,
    ref,
    computed,
    mount
}