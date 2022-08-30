function Vue(options = {}) {
    this.__init(options)
}

Vue.prototype.__init = function (options) {
    this.$options = options
    this.$data = options.data
    this.$el = options.el
    this.$methods = options.methods
    proxy(this, this.$data)
    observe(this.$data)
    new Compile(this)
}

function proxy(target, data) {
    Object.keys(data).forEach(key => {
        Object.defineProperty(target, key, {
            get() {
                return data[key]
            },
            set(newVal) {
                if (!isSameVal(newVal, data[key])) {
                    data[key] = newVal
                }
            }
        })
    })
}

function observe(data) {
    new Observe(data)
}

class Observe {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if (data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(target, key, value) {
        let that = this
        let dep = new Dep()
        this.walk(value)
        Object.defineProperty(target, key, {
            get() {
                Dep.target && dep.add(Dep.target)
                return value
            },
            set(newVal) {
                if (!isSameVal(newVal, value)) {
                    value = newVal
                    that.walk(value)
                    dep.notify()
                }
            }
        })
    }
}

class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb

        Dep.target = this
        this.__old = vm[key]
        Dep.target = null
    }
    update() {
        let newVal = this.vm[this.key]
        if (!isSameVal(newVal, this.__old)) {
            this._old = newVal
            this.cb(newVal)
        }
    }
}

class Dep {
    constructor() {
        this.watchers = new Set()
    }

    add(watcher) {
        if (watcher && watcher.update) {
            this.watchers.add(watcher)
        }
    }

    notify() {
        this.watchers.forEach(watcher => watcher.update())
    }
}

class Compile {
    constructor(vm) {
        this.vm = vm
        this.el = vm.$el
        this.methods = vm.$methods
        this.compile(this.el)
    }

    compile(el) {
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if (node.nodeType === 3) {
                this.compileText(node)
            } else if (node.nodeType === 1) {
                this.compileNode(node)
            }

            if (node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }

    compileText(node) {
        let reg = /\{\{(.+)\}\}/
        let value = node.textContent
        if (reg.test(value)) {
            let express = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[express])

            new Watcher(this.vm, express, (val) => {
                node.textContent = value.replace(reg, val)
            })
        }
    }

    compileNode(node) {
        if (node.attributes.length) {
            Array.from(node.attributes).forEach(attr => {
                let attrName = attr.name
                if (attrName.startsWith('v-')) {
                    // 只考虑了 v-on:click v-model
                    attrName = attrName.indexOf(':') > -1 ? attrName.substring(5) : attrName.substring(2)
                    let key = attr.value
                    this.updateNode(node, key, attrName, this.vm[key])
                }
            })
        }
    }

    updateNode(node, key, directive, value) {
        if (directive === 'model') {
            node.value = value
            new Watcher(this.vm, key, (val) => {
                node.value = val
            })
            node.addEventListener('input', () => {
                this.vm[key] = node.value
            })
        } else if (directive === 'click') {
            node.addEventListener('click', this.methods[key].bind(this.vm))
        }
    }
}

function isSameVal(x, y) {
    return x === y || (x !== x && y !== y)
}

export default Vue