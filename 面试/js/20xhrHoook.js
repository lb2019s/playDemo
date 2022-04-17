class XhrHook {
    constructor(beforeHooks = {}, afterHooks = {}) {
        this.XHR = window.XMLHttpRequest
        this.beforeHooks = beforeHooks
        this.afterHooks = afterHooks
        this.init()
    }
    init() {
        const _this = this
        window.XMLHttpRequest = function () {
            this._xhr = new _this.XHR()
            _this.overwrite(this)
        }
    }
    overwrite(proxyXHR) {
        for (let key in proxyXHR._xhr) {
            if (typeof proxyXHR._xhr[key] === 'function') {
                this.overwriteMethod(key, proxyXHR)
                continue
            }
            this.overwriteAttributes(key, proxyXHR)
        }
    }
    overwriteMethod(key, proxyXHR) {
        const beforeHooks = this.beforeHooks
        const afterHooks = this.afterHooks
        proxyXHR[key] = (...args) => {
            if (beforeHooks[key]) {
                const res = beforeHooks[key].call(proxyXHR, args)
                if (res) {
                    return
                }
            }
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args)

            afterHooks[key] && afterHooks[key].call(proxyXHR, args)

            return res
        }
    }
    overwriteAttributes(key, proxyXHR) {
        Object.defineProperty(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR))
    }
    setPropertyDescriptor(key, proxyXHR) {
        const obj = Object.create(null)
        const _this = this
        obj.set = function (val) {
            if (!key.startsWith('on')) {
                proxyXHR['__' + key] = val
                return
            }
            if (_this.beforeHooks[key]) {
                this._xhr[key] = (...args) => {
                    _this.beforeHooks[key].call(this, args)
                    val.apply(this, args)
                }
                return
            }
            this._xhr[key] = val
        }
        obj.get = function () {
            return this['__' + key] || this._xhr[key]
        }
        return obj
    }
}

new XhrHook({
    open: function () {
        console.log('open')
    },
    onload: function () {
        console.log('load')
    },
    onreadystatechange: function () {
        console.log('readystatechange')
    },
    onerror: function () {
        console.log('hook error')
    }
}, {
    open() {
        console.log('after open')
    }
})

const xhr = new XMLHttpRequest()
xhr.open('GET', '/info')
xhr.send()
xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    if (xhr.status === 200 || xhr.status === 304) {
        console.log(xhr.responseText)
    }
}