class EventEmitter {
    constructor() {
        this.cache = {}
    }

    on(event, callback) {
        if (this.cache[event]) {
            this.cache[event].push(callback)
        } else {
            this.cache[event] = [callback]
        }
        return () => this.off(event, callback)
    }

    emit(event, ...rest) {
        if (!this.cache[event]) return
        const events = this.cache[event].slice()
        events.forEach(func => {
            func(...rest)
        })
    }

    off(event, callback) {
        if (!this.cache[event]) return
        this.cache[event] = this.cache[event].filter(fn => fn !== callback)
    }

    once(event, callback) {
        const fn = (...args) => {
            callback(...args)
            this.off(event, fn)
        }
        this.on(event, fn)
    }
}

let eventBus = new EventEmitter()
let fn1 = function (name, age) {
    console.log(`${name} ${age}`)
}
let fn2 = function (name, age) {
    console.log(`hello, ${name} ${age}`)
}
eventBus.on('aaa', fn1)
const offFn2 = eventBus.on('aaa', fn2)
eventBus.emit('aaa', '布兰', 12)
eventBus.once('bbb', (a, b) => { console.log('once', a + b) })
eventBus.emit('bbb', 1, 2)
eventBus.emit('bbb', 2, 3)
offFn2()
eventBus.emit('aaa', '小橘', 44)
